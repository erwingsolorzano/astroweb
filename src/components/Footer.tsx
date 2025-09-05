import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-green-400/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg border border-green-400/50">
            <span className="text-black font-bold text-xl font-mono">AR</span>
          </div>
          
          <p className="text-green-100 font-mono flex items-center justify-center space-x-2">
            <span>© {currentYear} Erwing Solorzano. Hecho con</span>
            <Heart className="w-4 h-4 text-green-400 fill-current" />
            <span>y mucho café.</span>
          </p>
          <p className="text-sm text-green-200 font-mono mt-2">
            Construido con Astro, React y Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}