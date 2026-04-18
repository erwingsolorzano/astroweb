import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Clock3, Hourglass, MessageSquareQuote } from 'lucide-react';
import { sendEmail, validateForm, type ContactFormData } from '../lib/email';
import { events } from '../lib/analytics';
import contactData from '../content/contact.json';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<string[]>([]);
  const [emailCopied, setEmailCopied] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const isOnCooldown = cooldown > 0;

  useEffect(() => {
    if (!cooldown) return;

    const intervalId = window.setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [cooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors.length > 0) {
      setErrors([]);
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cooldown > 0) {
      setErrors([`Por favor espera ${cooldown} segundos antes de enviar otro mensaje.`]);
      return;
    }

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      await sendEmail(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      events.contactSubmit();
      setShowSuccessFlash(true);
      setCooldown(30);

      window.setTimeout(() => setShowSuccessFlash(false), 900);

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrors(['No se pudo enviar el mensaje. Intenta nuevamente.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.alternative.email);
      setEmailCopied(true);
      events.emailCopy();
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-green-200"
        >
          <MessageSquareQuote className="h-4 w-4" />
          {contactData.title}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.03 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl font-display"
        >
          Hablemos de tu idea
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg font-body"
        >
          {contactData.description}
        </motion.p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          whileHover={{ y: -4 }}
          className="relative rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <AnimatePresence>
            {submitStatus === 'success' && isOnCooldown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[2rem]"
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 shadow-2xl shadow-black/30">
                    <motion.div
                      animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-green-200"
                    >
                      <Hourglass className="h-6 w-6" />
                    </motion.div>
                    <span className="text-sm font-medium text-white">Procesando respuesta</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200 font-body">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={contactData.form.name.placeholder}
                className={`w-full rounded-xl border px-4 py-3 bg-black/30 text-white placeholder:text-slate-400 font-body transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 ${
                  errors.some((e) => e.includes('nombre')) ? 'border-red-500/70' : 'border-white/10'
                }`}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200 font-body">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={contactData.form.email.placeholder}
                className={`w-full rounded-xl border px-4 py-3 bg-black/30 text-white placeholder:text-slate-400 font-body transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 ${
                  errors.some((e) => e.includes('email')) ? 'border-red-500/70' : 'border-white/10'
                }`}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200 font-body">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={contactData.form.message.placeholder}
                className={`min-h-[140px] w-full resize-none rounded-xl border px-4 py-3 bg-black/30 text-white placeholder:text-slate-400 font-body transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 ${
                  errors.some((e) => e.includes('mensaje')) ? 'border-red-500/70' : 'border-white/10'
                }`}
                disabled={isSubmitting}
              />
            </div>

            {errors.length > 0 && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4" role="alert" aria-live="assertive">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-100 font-body">
                    • {error}
                  </p>
                ))}
              </div>
            )}

            <AnimatePresence>
              {submitStatus === 'success' && isOnCooldown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative overflow-hidden rounded-xl border border-green-400/20 bg-green-400/10 p-4"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '120%', opacity: [0, 0.18, 0] }}
                    transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="relative text-sm text-green-100 font-body"
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="mr-2 inline-block"
                    >
                      <Hourglass className="inline-block h-4 w-4 align-text-bottom" />
                    </motion.span>
                    {contactData.success}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
              <motion.button
                type="submit"
                disabled={isSubmitting || isOnCooldown}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className={`group relative w-full overflow-hidden rounded-xl py-4 text-lg font-semibold font-body transition-all duration-300 shadow-xl ${
                  submitStatus === 'success' && isOnCooldown
                    ? 'cursor-default border border-green-400/30 bg-green-400/15 text-white shadow-green-400/20'
                    : isSubmitting || cooldown
                      ? 'cursor-not-allowed bg-green-400 text-black opacity-70 shadow-green-400/15'
                      : 'bg-green-400 text-black shadow-green-400/15 hover:scale-[1.01] hover:shadow-green-400/25'
                }`}
              >
                {showSuccessFlash && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.92 }}
                    animate={{ opacity: [0, 0.18, 0], scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="absolute inset-0 bg-white/25"
                  />
                )}

                {!(submitStatus === 'success' && isOnCooldown) && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={!isSubmitting ? { x: '100%' } : {}}
                    transition={{ duration: 0.6 }}
                  />
                )}

                {isSubmitting && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white/40"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                  />
                )}

                <span className="relative flex items-center justify-center gap-3">
                {submitStatus === 'success' && isOnCooldown ? (
                    <>
                      <motion.span
                        animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-flex"
                      >
                        <Hourglass className="h-5 w-5" />
                      </motion.span>
                      Mensaje enviado
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Enviando...
                    </>
                  ) : isOnCooldown ? (
                    <>
                      <Clock3 className="h-5 w-5" />
                      Espera {cooldown}s antes de enviar otro mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {contactData.form.submit}
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.05 }}
          whileHover={{ y: -2 }}
          className="flex items-center justify-between gap-4 rounded-3xl border border-white/12 bg-white/[0.05] px-6 py-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.28em] text-green-300/75">{contactData.alternative.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300 font-body">Escríbeme al correo y te respondo con contexto.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden truncate font-body text-slate-200 sm:block">{contactData.alternative.email}</span>
            <motion.button
              onClick={copyEmail}
              aria-label={`Copiar ${contactData.alternative.email}`}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 font-body"
            >
              {emailCopied ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">{contactData.alternative.copyEmailText}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
