"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { sendMessage } from "@/app/contact/actions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  initialContactState,
  validateContact,
  type ContactField,
  type ContactFieldErrors,
  type ContactValues,
} from "@/lib/validation/contact";

const EMPTY: ContactValues = { name: "", email: "", message: "" };

const inputClass =
  "mt-1.5 block w-full rounded-md border border-border-strong bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted/60 hover:border-muted/60";

/**
 * Checks input in the browser with the same Zod schema the server action uses,
 * so mistakes show up without a round trip — but the server's verdict always
 * wins.
 */
export function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialContactState);
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const fieldRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const returningFromSuccess = useRef(false);

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = CONTACT_FIELDS.find((field) => fieldErrors[field]);
    if (first) fieldRefs.current[first]?.focus();
  }

  // Each submission returns a new state object, so this runs once per reply.
  useEffect(() => {
    if (state.status === "success") {
      setValues(EMPTY);
      setErrors({});
      setShowSuccess(true);
    } else if (state.status === "error") {
      if (state.fieldErrors) {
        setErrors(state.fieldErrors);
        focusFirstError(state.fieldErrors);
      } else {
        alertRef.current?.focus();
      }
    }
  }, [state]);

  useEffect(() => {
    if (showSuccess) {
      successRef.current?.focus();
    } else if (returningFromSuccess.current) {
      returningFromSuccess.current = false;
      fieldRefs.current.name?.focus();
    }
  }, [showSuccess]);

  function errorFor(next: ContactValues, field: ContactField) {
    const result = validateContact(next);
    return result.success ? undefined : result.fieldErrors[field];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateContact(values);
    if (result.success) {
      setErrors({});
      return;
    }
    // Preventing the submit also stops React from running the form action.
    event.preventDefault();
    setErrors(result.fieldErrors);
    focusFirstError(result.fieldErrors);
  }

  /** Everything the three controls share: value, validation and ARIA wiring. */
  function control(field: ContactField, describedBy?: string) {
    const error = errors[field];

    return {
      ref: (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        fieldRefs.current[field] = node;
      },
      id: `contact-${field}`,
      name: field,
      value: values[field],
      required: true,
      "aria-invalid": error ? true : undefined,
      "aria-describedby":
        [error && `contact-${field}-error`, describedBy].filter(Boolean).join(" ") || undefined,
      onChange: (event: { target: { value: string } }) => {
        const next = { ...values, [field]: event.target.value };
        setValues(next);
        // Once a field is flagged, re-check it on every keystroke so the
        // message disappears the moment it's fixed.
        if (error) setErrors((current) => ({ ...current, [field]: errorFor(next, field) }));
      },
      onBlur: () => {
        // Don't complain about a field someone has only tabbed through.
        if (!values[field]) return;
        setErrors((current) => ({ ...current, [field]: errorFor(values, field) }));
      },
      className: cn(inputClass, error && "border-danger hover:border-danger"),
    };
  }

  if (showSuccess && state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-accent/30 bg-accent/5 p-6 outline-none sm:p-8"
      >
        <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden />
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">Message sent</h3>
        <p className="mt-2 text-muted">{state.message}</p>
        <button
          type="button"
          onClick={() => {
            returningFromSuccess.current = true;
            setShowSuccess(false);
          }}
          className="mt-5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Send another message
        </button>
      </div>
    );
  }

  const messageLength = values.message.trim().length;

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {/* The action still runs without JavaScript, but a statically rendered
          page can't show its result — so point those visitors at email. */}
      <noscript>
        <p className="rounded-md border border-border bg-surface-raised p-4 text-sm text-muted">
          JavaScript is off, so this form can&rsquo;t confirm your message was sent. Email me at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-foreground underline">
            {site.email}
          </a>{" "}
          instead.
        </p>
      </noscript>

      {state.status === "error" && !state.fieldErrors && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm outline-none"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
          <div>
            <p>{state.message}</p>
            {state.suggestEmail && (
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block break-all font-medium underline underline-offset-2"
              >
                {site.email}
              </a>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium">
            Name
          </label>
          <input {...control("name")} type="text" autoComplete="name" />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium">
            Email
          </label>
          <input
            {...control("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          {...control("message", "contact-message-count")}
          rows={7}
          placeholder="What are you working on, and how can I help?"
        />
        <div className="flex items-start justify-between gap-4">
          <FieldError id="contact-message-error" message={errors.message} />
          <p
            id="contact-message-count"
            className={cn(
              "ml-auto mt-1.5 shrink-0 font-mono text-xs text-muted",
              messageLength > CONTACT_LIMITS.message && "text-danger",
            )}
          >
            {messageLength.toLocaleString("en")} / {CONTACT_LIMITS.message.toLocaleString("en")}
          </p>
        </div>
      </div>

      {/* Honeypot. Moved off-screen rather than display:none, which some bots
          know to skip, and kept out of the tab order and the accessibility
          tree, so only a bot ever fills it in. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <SubmitButton />
        <p className="text-xs text-muted">Your details are only used to reply to you.</p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

/** A child of the form, because useFormStatus only sees its parent form. */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
      <span role="status" className="sr-only">
        {pending ? "Sending your message…" : ""}
      </span>
    </>
  );
}
