import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const getEmailConfig = (): EmailConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  return { serviceId, templateId, publicKey };
};

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const config = getEmailConfig();
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'alex@ejemplo.com', // Tu email de destino
    };

    await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please try again.');
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (formData: ContactFormData): string[] => {
  const errors: string[] = [];

  if (!formData.name.trim()) {
    errors.push('El nombre es requerido');
  }

  if (!formData.email.trim()) {
    errors.push('El email es requerido');
  } else if (!validateEmail(formData.email)) {
    errors.push('El email no es válido');
  }

  if (!formData.message.trim()) {
    errors.push('El mensaje es requerido');
  } else if (formData.message.length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  return errors;
};