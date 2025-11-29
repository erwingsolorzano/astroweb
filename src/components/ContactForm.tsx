import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check } from 'lucide-react';
import { sendEmail, validateForm, type ContactFormData } from '../lib/email';
import { events } from '../lib/analytics';
import contactData from '../content/contact.json';

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
  const isOnCooldown = cooldown > 0;

  useEffect(() => {
    if (!cooldown) return;

    const intervalId = window.setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          return 0; // se acaba el cooldown
        }
        return prev - 1; // restar 1 segundo
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [cooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check cooldown
    if (cooldown > 0) {
      setErrors([`Por favor espera ${cooldown} segundos antes de enviar otro mensaje.`]);
      return;
    }
    
    // Validate form
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
      
      // Show success message for 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrors(['Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.']);
    } finally {
      setIsSubmitting(false);
      // Set cooldown for 60 seconds
      setCooldown(30);
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold font-mono text-green-100 mb-4"
        >
          {contactData.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true }}
          className="text-lg text-green-100 max-w-2xl mx-auto font-medium font-mono"
        >
          {contactData.description}
        </motion.p>
      </div>

      <div className="space-y-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900/90 via-black/90 to-green-950/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-green-500/30 hover:shadow-green-500/20 transition-all duration-500"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold font-mono bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                Nombre
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Su nombre"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-black/80 text-green-200 placeholder-green-500/70 font-mono focus:ring-4 focus:ring-green-500/30 transition-all duration-300 shadow-lg hover:shadow-green-500/20 backdrop-blur-sm ${
                    errors.some(e => e.includes('nombre')) 
                      ? 'border-red-500/70 focus:border-red-400' 
                      : 'border-green-500/50 focus:border-green-400'
                  }`}
                  disabled={isSubmitting}
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold font-mono bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                Email
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="mi.email@example.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-black/90 text-green-100 placeholder-green-400/60 font-mono focus:ring-4 focus:ring-green-500/30 transition-all duration-300 shadow-lg hover:shadow-green-500/20 backdrop-blur-sm ${
                    errors.some(e => e.includes('email')) 
                      ? 'border-red-500/70 focus:border-red-400' 
                      : 'border-green-500/50 focus:border-green-400'
                  }`}
                  disabled={isSubmitting}
                />
              </motion.div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold font-mono bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                Mensaje
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Su mensaje..."
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-black/90 text-green-100 placeholder-green-400/60 font-mono focus:ring-4 focus:ring-green-500/30 transition-all duration-300 resize-none shadow-lg hover:shadow-green-500/20 backdrop-blur-sm min-h-[120px] ${
                    errors.some(e => e.includes('mensaje')) 
                      ? 'border-red-500/70 focus:border-red-400' 
                      : 'border-green-500/50 focus:border-green-400'
                  }`}
                  disabled={isSubmitting}
                />
              </motion.div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border-2 border-red-500/50 rounded-lg p-4 shadow-lg">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-200 font-medium font-mono">
                    • {error}
                  </p>
                ))}
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && isOnCooldown &&(
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-lg p-4 shadow-lg"
              >
                <p className="text-sm text-green-200 font-medium font-mono">
                  ✅ {contactData.success}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting || isOnCooldown}
                className={`group relative overflow-hidden w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold font-mono rounded-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/50 py-4 text-lg ${
                  isSubmitting || cooldown ? "opacity-80 cursor-not-allowed" : "hover:scale-105 transform"
                }`}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={!isSubmitting ? { x: "100%" } : {}}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Loading progress bar */}
                {isSubmitting && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white/40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}

                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-black border-t-transparent"></div>
                      Enviando...
                    </>
                  ) : isOnCooldown ? (
                    <>
                      <div className="w-6 h-6 flex items-center justify-center">⏳</div>
                      Espera {cooldown}s antes de enviar otro mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:animate-pulse" />
                      Enviar Mensaje
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-950/30 via-black/30 to-gray-900/30 rounded-2xl p-8 border-2 border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold font-mono text-green-100 mb-6 drop-shadow-lg">
            {contactData.alternative.title}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/80 rounded-lg shadow-lg backdrop-blur-sm border border-green-500/50">
              <span className="text-green-100 font-medium font-mono">
                {contactData.alternative.email}
              </span>
              <button
                onClick={copyEmail}
                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black text-sm font-bold font-mono rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 transform"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 animate-bounce" />
                    <span className="hidden sm:inline">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                    <span className="hidden sm:inline">{contactData.alternative.copyEmailText}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}