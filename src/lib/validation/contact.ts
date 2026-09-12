import { z } from "zod";

/**
 * The contact form's rules, shared by the browser and the server action. The
 * browser copy exists for instant feedback; the server copy is the one that
 * counts, because anything can POST to an action.
 */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
} as const;

/** A field real visitors never see. Anything in it means a bot filled the form. */
export const HONEYPOT_FIELD = "website";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Please tell me your name." })
    .max(CONTACT_LIMITS.name, {
      error: `Keep your name under ${CONTACT_LIMITS.name} characters.`,
    })
    // The name goes into the email subject line.
    .regex(/^[^\r\n]*$/, { error: "Your name can't contain line breaks." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "I need an email address to reply to." })
    .max(CONTACT_LIMITS.email, { error: "That email address is too long." })
    // Piped so the address is trimmed before it's checked.
    .pipe(z.email({ error: "That doesn't look like an email address. Check for typos." })),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, {
      error: `Say a little more: at least ${CONTACT_LIMITS.messageMin} characters.`,
    })
    .max(CONTACT_LIMITS.message, {
      error: `Keep it under ${CONTACT_LIMITS.message.toLocaleString("en")} characters, or email me directly.`,
    }),
});

/** What the form holds: raw, untrimmed strings. */
export type ContactValues = z.input<typeof contactSchema>;
/** What survives validation, trimmed. */
export type ContactMessage = z.output<typeof contactSchema>;
export type ContactField = keyof ContactValues;
/** One message per field — the first rule it broke. */
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: ContactField[] = ["name", "email", "message"];

export function validateContact(
  values: ContactValues,
): { success: true; data: ContactMessage } | { success: false; fieldErrors: ContactFieldErrors } {
  const result = contactSchema.safeParse(values);
  if (result.success) return { success: true, data: result.data };

  const { fieldErrors } = z.flattenError(result.error);
  const firstErrors: ContactFieldErrors = {};
  for (const field of CONTACT_FIELDS) {
    const message = fieldErrors[field]?.[0];
    if (message) firstErrors[field] = message;
  }
  return { success: false, fieldErrors: firstErrors };
}

/** What the server action hands back to the form after each submission. */
export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: ContactFieldErrors;
      /** Echoed back so a no-JavaScript submission doesn't lose what was typed. */
      values?: ContactValues;
      /** Offer the email address as a way round the problem. */
      suggestEmail?: boolean;
    };

export const initialContactState: ContactFormState = { status: "idle" };
