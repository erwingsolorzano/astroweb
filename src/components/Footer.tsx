import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

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
              <span>Inspirado en la informática retro</span>
            </div>
          </div>

          {/* Tecnologías */}
          <div className="text-sm text-green-200 font-mono flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <span>Construido con</span>
            <div className="flex items-center space-x-3">
                <img
                  src="./astro.svg"
                  alt="Astro"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                  title='Astro'
                />
                <img
                  src="./react.svg"
                  alt="React"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                  title='React'
                />
                <img
                  src="./tailwind.svg"
                  alt="Tailwind"
                  className="w-5 h-5 hover:scale-150 transition-transform duration-200"
                  title='Tailwind'
                />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
