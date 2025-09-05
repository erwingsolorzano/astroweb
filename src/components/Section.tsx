import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '',
  containerClassName = ''
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-16 lg:py-24 scroll-mt-20 ${className}`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {title && (
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-mono text-green-100 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-green-100 max-w-2xl mx-auto font-medium font-mono">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}