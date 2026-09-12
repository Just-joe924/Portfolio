"use server";

import { sendContactEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  validateContact,
  type ContactFormState,
  type ContactValues,
} from "@/lib/validation/contact";

/** Three messages per visitor per ten minutes: plenty for a person, useless for a script. */
const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };

export async function sendMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Bots fill in every field they find; people never see this one. Report
  // success so the bot has no reason to retry or adapt.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: "success", message: "Thanks. Your message is on its way." };
  }

  const values: ContactValues = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    message: readText(formData, "message"),
  };

  const result = validateContact(values);
  if (!result.success) {
    return {
      status: "error",
      message: "Some fields need another look.",
      fieldErrors: result.fieldErrors,
      values,
    };
  }

  // Counted after validation, so fixing a typo doesn't use up an attempt.
  const limit = rateLimit(`contact:${getClientIp()}`, RATE_LIMIT);
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfterMs / 60_000);
    return {
      status: "error",
      message: `That's a few messages in a short time. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}, or email me directly.`,
      values,
      suggestEmail: true,
    };
  }

  const sent = await sendContactEmail(result.data);
  if (!sent.ok) {
    return {
      status: "error",
      message:
        "Your message couldn't be delivered just now. That's a problem on my end, not yours. Try again in a minute, or email me directly.",
      values,
      suggestEmail: true,
    };
  }

  const firstName = result.data.name.split(/\s+/)[0];
  return {
    status: "success",
    message: `Thanks, ${firstName}. It's in my inbox, and I'll reply to ${result.data.email}.`,
  };
}

function readText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}
