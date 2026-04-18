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
      className={`py-20 lg:py-28 scroll-mt-24 ${className}`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {title && (
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-green-300/80 font-semibold font-body">
                Sección
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 font-display"
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-body"
              >
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
