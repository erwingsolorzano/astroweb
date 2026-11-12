import { useEffect, useRef, useState } from 'react';
import { sendEmail, validateForm, type ContactFormData } from '../lib/email';
import { events } from '../lib/analytics';
import { useReveal } from '../hooks/useReveal';
import contactData from '../content/contact.json';

const emptyForm: ContactFormData = { name: '', email: '', message: '' };

const fieldClass =
  'w-full rounded-none border-0 border-b-2 border-ink bg-transparent py-3 text-lg text-ink outline-none transition-colors duration-200 focus:border-forest focus-visible:outline-none aria-[invalid=true]:border-forest';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimeout = useRef<number>();
  const details = useReveal<HTMLDivElement>();
  const form = useReveal<HTMLFormElement>();

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      await sendEmail(formData);
      events.contactSubmit();
      setFormData(emptyForm);
      setIsSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setErrors([contactData.error]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.alternative.email);
      setEmailCopied(true);
      events.emailCopy();
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => setEmailCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const hasError = (keyword: string) => errors.some((error) => error.toLowerCase().includes(keyword));

  return (
    <section id="contacto" className="relative scroll-mt-4 overflow-hidden bg-mandarin px-5 pb-20 pt-16 md:px-10 md:pt-24">
      <div
        aria-hidden="true"
        className="absolute -bottom-[260px] -right-[200px] h-[460px] w-[460px] rounded-full bg-cream md:-bottom-[320px] md:-right-[220px] md:h-[700px] md:w-[700px]"
      />

      <h2 className="relative m-0 font-display text-[clamp(64px,23.4vw,300px)] font-normal uppercase leading-[0.8] text-crest">
        {contactData.title}
      </h2>
      <p className="relative m-0 mt-5 font-display text-[clamp(32px,5vw,64px)] md:mt-8 uppercase leading-[0.9] text-forest">
        {contactData.subtitle}
      </p>

      <div className="relative mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-2 lg:gap-[72px]">
        <div ref={details.ref} data-reveal="island" className={`flex flex-col gap-[18px] ${details.revealClass}`}>
          <a
            href={`mailto:${contactData.alternative.email}`}
            className="inline-flex min-h-11 items-end self-start border-b-[3px] border-ink pb-1 text-[clamp(22px,6vw,34px)] font-bold tracking-[-0.02em]"
          >
            {contactData.alternative.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="label min-h-11 self-start rounded-full bg-ink px-5 text-cream transition-colors duration-200 hover:bg-forest"
          >
            <span aria-live="polite">
              {emailCopied ? contactData.alternative.copiedText : contactData.alternative.copyEmailText}
            </span>
          </button>
          <p className="m-0 max-w-[360px] text-[17px] leading-normal">{contactData.note}</p>
        </div>

        {isSent ? (
          <p
            role="status"
            className="m-0 self-center font-display text-[clamp(40px,4.4vw,56px)] uppercase leading-[0.9] text-forest"
          >
            {contactData.success}
          </p>
        ) : (
          <form
            ref={form.ref}
            data-reveal="island"
            onSubmit={handleSubmit}
            noValidate
            className={`flex flex-col gap-6 ${form.revealClass}`}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  {contactData.form.name.label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={contactData.form.name.placeholder}
                  aria-invalid={hasError('nombre')}
                  disabled={isSubmitting}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {contactData.form.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={contactData.form.email.placeholder}
                  aria-invalid={hasError('email')}
                  disabled={isSubmitting}
                  className={fieldClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {contactData.form.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder={contactData.form.message.placeholder}
                aria-invalid={hasError('mensaje')}
                disabled={isSubmitting}
                className={`${fieldClass} resize-none`}
              />
            </div>

            {errors.length > 0 && (
              <ul role="alert" className="m-0 flex flex-col gap-1 text-[15px] font-semibold text-ink">
                {errors.map((error) => (
                  <li key={error}>— {error}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="grid h-[52px] w-full place-items-center rounded-full bg-forest font-display text-2xl uppercase text-crest transition-transform duration-[450ms] ease-snap disabled:cursor-wait disabled:opacity-70 md:h-[136px] md:w-[136px] md:self-end md:text-[30px] motion-safe:enabled:hover:-rotate-[10deg] motion-safe:enabled:hover:scale-[1.07] motion-safe:focus-visible:-rotate-[10deg] motion-safe:focus-visible:scale-[1.07]"
            >
              {isSubmitting ? contactData.form.submitting : contactData.form.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
