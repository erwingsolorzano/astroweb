import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-green-400 text-xs font-mono rounded-lg border border-green-400/30 whitespace-nowrap z-10 shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-green-400/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">

          {/* Texto principal */}
          <div className="text-green-100 font-mono flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-center">
            <span>© {currentYear} Erwing Solorzano.</span>
            <div className="flex items-center space-x-2">
              <span>Hecho con paciencia</span>
              <span>y algo de café.</span>
            </div>
          </div>

          {/* Tecnologías */}
          <div className="text-sm text-green-200 font-mono flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <span>Construido con</span>
            <div className="flex items-center space-x-3">
              <Tooltip text="Astro">
                <img
                  src="./src/images/astro.svg"
                  alt="Astro"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                />
              </Tooltip>
              <Tooltip text="React">
                <img
                  src="./src/images/react.svg"
                  alt="React"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                />
              </Tooltip>
              <Tooltip text="Tailwind CSS">
                <img
                  src="./src/images/tailwind.svg"
                  alt="Tailwind"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
