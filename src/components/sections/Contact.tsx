"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { usePrefs } from "@/lib/prefs";
import { COMPANY } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

/* ─────────────────────────────────────────────────────────────────────────────
   The closing pair.

   `CallToAction` is a quiet ruled band — an invitation, nothing more. `Contact`
   is the form itself, laid out like the back of a shipping document: labelled
   fields, hairline boxes, the factory number set as a figure rather than as a
   sentence. The two share the same rules and the same mono voice, so they read
   as one movement even though only one of them asks for anything.
   ──────────────────────────────────────────────────────────────────────────── */

/* ── Call to action ────────────────────────────────────────────────────────── */

export function CallToAction() {
  const { t } = usePrefs();

  return (
    <section
      aria-labelledby="cta-title"
      className="border-y border-line bg-surface-sunk"
    >
      <div className="u-container py-[clamp(3.25rem,7vw,6rem)]">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="u-label">{t.cta.eyebrow}</p>
              <h2 id="cta-title" className="u-display u-display-md mt-5">
                {t.cta.title}
              </h2>
              <p className="u-measure mt-6 text-ink-soft">{t.cta.body}</p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <a href="#contact" className="u-btn u-btn-solid">
                {t.cta.primary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────────────────────── */

/** Deliberately permissive: one @, a dot in the domain, no spaces. Anything
 *  stricter starts rejecting addresses that exist. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

type FieldName = "name" | "company" | "market" | "email" | "message";
type RequiredField = "name" | "email" | "message";
type Errors = Partial<Record<RequiredField, string>>;
type Status = "idle" | "sending" | "sent";

const EMPTY: Record<FieldName, string> = {
  name: "",
  company: "",
  market: "",
  email: "",
  message: "",
};

const DIRECT_ROW =
  "grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-line py-3.5";

const CONTROL =
  "w-full rounded-[2px] border bg-transparent px-4 py-3.5 text-start " +
  "text-ink placeholder:text-ink-soft/55 transition-colors duration-200";

/** Label above, field, then the error — one column, so the shape is identical
 *  in both directions and nothing has to be mirrored by hand. */
function FieldRow({
  htmlFor,
  label,
  error,
  errorId,
  className = "",
  children,
}: {
  htmlFor: string;
  label: string;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="u-label block">
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p
          id={errorId}
          className="mt-2.5 border-s-2 border-ink ps-2.5 font-mono text-[0.74rem] leading-relaxed text-ink"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact() {
  const { t } = usePrefs();
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const returning = useRef(false);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  // Send the caret where the eye already went: onto the confirmation, or back
  // to the first field when the visitor asks for a second enquiry.
  useEffect(() => {
    if (status === "sent") {
      successRef.current?.focus();
    } else if (returning.current) {
      returning.current = false;
      nameRef.current?.focus();
    }
  }, [status]);

  function update(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field === "name" || field === "email" || field === "message") {
      setErrors((e) => {
        if (!e[field]) return e;
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const next: Errors = {};
    if (!values.name.trim()) next.name = t.contact.errors.name;
    if (!EMAIL_RE.test(values.email.trim())) next.email = t.contact.errors.email;
    if (!values.message.trim()) next.message = t.contact.errors.message;
    setErrors(next);

    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.email) {
      emailRef.current?.focus();
      return;
    }
    if (next.message) {
      messageRef.current?.focus();
      return;
    }

    // Nothing leaves the browser. The pause exists so the state change reads as
    // an action rather than as a glitch.
    setStatus("sending");
    timer.current = window.setTimeout(() => setStatus("sent"), 700);
  }

  function onReset() {
    if (timer.current !== null) window.clearTimeout(timer.current);
    returning.current = true;
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
  }

  const border = (invalid: boolean) =>
    invalid ? "border-ink" : "border-line hover:border-line-strong";

  const noteId = fid("note");
  const sending = status === "sending";

  return (
    <section id="contact" aria-labelledby="contact-title" className="u-section">
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* Intro and the direct line */}
          <Reveal className="lg:col-span-5">
            <p className="u-label">{t.contact.eyebrow}</p>
            <h2 id="contact-title" className="u-display u-display-md mt-5">
              {t.contact.title}
            </h2>
            <p className="u-measure mt-6 text-ink-soft">{t.contact.lede}</p>

            <div className="mt-12 border-t border-line pt-6">
              <p className="u-label">{t.contact.direct}</p>
              {/* One ruled row per channel, like the back of a shipping
                  document. The address row only exists once there is one. */}
              <dl className="mt-4 border-b border-line">
                <div className={DIRECT_ROW}>
                  <dt className="u-label">{t.contact.phoneLabel}</dt>
                  <dd>
                    <a
                      href={COMPANY.phoneHref}
                      dir="ltr"
                      className="inline-block font-mono text-lg tabular-nums tracking-[0.06em] text-ink transition-colors duration-200 hover:text-accent sm:text-xl"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
                <div className={DIRECT_ROW}>
                  <dt className="u-label">{t.contact.whatsappLabel}</dt>
                  <dd>
                    <a
                      href={COMPANY.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="u-mono inline-flex items-center gap-2 text-ink underline underline-offset-4 transition-colors duration-200 hover:text-accent"
                    >
                      <SocialIcon id="whatsapp" />
                      {t.contact.whatsappAction}
                    </a>
                  </dd>
                </div>
                {COMPANY.email ? (
                  <div className={DIRECT_ROW}>
                    <dt className="u-label">{t.contact.emailLabel}</dt>
                    <dd>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        dir="ltr"
                        className="u-mono text-ink underline underline-offset-4 transition-colors duration-200 hover:text-accent"
                      >
                        {COMPANY.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                <div className={DIRECT_ROW}>
                  <dt className="u-label">{t.contact.locationLabel}</dt>
                  <dd className="text-ink">{t.contact.locationValue}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* The form */}
          <Reveal className="lg:col-span-7" delay={80}>
            <div className="border border-line bg-surface">
              <div className="u-ticks" aria-hidden="true" />

              <div className="p-6 sm:p-8 lg:p-10">
                {status === "sent" ? (
                  <div
                    ref={successRef}
                    tabIndex={-1}
                    role="status"
                    className="focus-visible:outline-none"
                  >
                    <p className="u-label">{t.contact.eyebrow}</p>
                    <p className="u-display u-display-sm u-measure mt-5">
                      {t.contact.success}
                    </p>
                    <div className="mt-9 border-t border-line pt-6">
                      <button type="button" className="u-btn" onClick={onReset}>
                        {t.contact.reset}
                      </button>
                      <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-ink-soft">
                        {t.contact.demoNote}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={onSubmit} aria-busy={sending}>
                    <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                      <FieldRow
                        htmlFor={fid("name")}
                        label={t.contact.fields.name}
                        error={errors.name}
                        errorId={fid("name-error")}
                      >
                        <input
                          ref={nameRef}
                          id={fid("name")}
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.name}
                          placeholder={t.contact.placeholders.name}
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={
                            errors.name ? fid("name-error") : undefined
                          }
                          onChange={(e) => update("name", e.target.value)}
                          className={`${CONTROL} ${border(Boolean(errors.name))}`}
                        />
                      </FieldRow>

                      <FieldRow
                        htmlFor={fid("company")}
                        label={t.contact.fields.company}
                        errorId={fid("company-error")}
                      >
                        <input
                          id={fid("company")}
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={values.company}
                          placeholder={t.contact.placeholders.company}
                          onChange={(e) => update("company", e.target.value)}
                          className={`${CONTROL} ${border(false)}`}
                        />
                      </FieldRow>

                      <FieldRow
                        htmlFor={fid("market")}
                        label={t.contact.fields.market}
                        errorId={fid("market-error")}
                      >
                        <input
                          id={fid("market")}
                          name="market"
                          type="text"
                          value={values.market}
                          placeholder={t.contact.placeholders.market}
                          onChange={(e) => update("market", e.target.value)}
                          className={`${CONTROL} ${border(false)}`}
                        />
                      </FieldRow>

                      <FieldRow
                        htmlFor={fid("email")}
                        label={t.contact.fields.email}
                        error={errors.email}
                        errorId={fid("email-error")}
                      >
                        <input
                          ref={emailRef}
                          id={fid("email")}
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          dir="ltr"
                          value={values.email}
                          placeholder={t.contact.placeholders.email}
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={
                            errors.email ? fid("email-error") : undefined
                          }
                          onChange={(e) => update("email", e.target.value)}
                          className={`${CONTROL} ${border(Boolean(errors.email))}`}
                        />
                      </FieldRow>

                      <FieldRow
                        htmlFor={fid("message")}
                        label={t.contact.fields.message}
                        error={errors.message}
                        errorId={fid("message-error")}
                        className="sm:col-span-2"
                      >
                        <textarea
                          ref={messageRef}
                          id={fid("message")}
                          name="message"
                          rows={5}
                          required
                          value={values.message}
                          placeholder={t.contact.placeholders.message}
                          aria-invalid={errors.message ? true : undefined}
                          aria-describedby={
                            errors.message ? fid("message-error") : undefined
                          }
                          onChange={(e) => update("message", e.target.value)}
                          className={`${CONTROL} resize-y ${border(
                            Boolean(errors.message),
                          )}`}
                        />
                      </FieldRow>
                    </div>

                    <div className="mt-9 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                      <button
                        type="submit"
                        disabled={sending}
                        aria-describedby={noteId}
                        className="u-btn u-btn-solid shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {sending ? t.contact.sending : t.contact.submit}
                      </button>
                      <p
                        id={noteId}
                        className="font-mono text-[0.7rem] leading-relaxed text-ink-soft sm:max-w-[36ch] sm:text-end"
                      >
                        {t.contact.demoNote}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
