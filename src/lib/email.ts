import { Resend } from "resend";

import { site } from "@/lib/site";
import type { ContactMessage } from "@/lib/validation/contact";

/**
 * Server-only — it reads the Resend API key. Call it from server actions or
 * route handlers, never from a client component.
 *
 * Configuration lives in .env.local; see .env.example for the three variables.
 */

/** Resend's shared test sender: works before you verify a domain. */
const DEFAULT_FROM = "Portfolio contact form <onboarding@resend.dev>";

export async function sendContactEmail({ name, email, message }: ContactMessage): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY and CONTACT_TO_EMAIL must be set. See .env.example.");
    return { ok: false };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to,
      // Hitting reply in the inbox answers the sender, not the form.
      replyTo: email,
      subject: `New message from ${name}`,
      // Plain text only: nothing a visitor types can be rendered as HTML.
      text: [
        `${name} <${email}> sent a message through ${site.url}/contact`,
        "",
        message,
        "",
        "--",
        "Reply to this email to answer them directly.",
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return { ok: false };
  }
}
