import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'astro:assets';

const navigation = [
  { name: 'Sobre mí', href: '#sobre-mi' },
  { name: 'Experiencia', href: '#experiencia' },
  { name: 'Educación', href: '#educacion' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' },
];

const navigationEn = [
  { name: 'About', href: '#sobre-mi' },
  { name: 'Experience', href: '#experiencia' },
  { name: 'Education', href: '#educacion' },
  { name: 'Projects', href: '#proyectos' },
  { name: 'Contact', href: '#contacto' },
];
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll for transparent header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.3,
      }
    );

    // Observe all sections
    navigation.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Small delay to allow menu to close first
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80; // Account for fixed header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black border-b border-green-400/20 shadow-2xl shadow-green-400/5 md:backdrop-blur-xl' 
          : 'bg-black md:bg-transparent border-b border-transparent'
      }`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
          <img
            src="./src/images/iconES.webp"
            alt="Logo"
            className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 text-sm font-medium font-mono rounded-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === item.href.slice(1)
                    ? 'text-black bg-green-400 shadow-lg shadow-green-400/50'
                    : 'text-green-400 hover:text-black hover:bg-green-400/90 border border-transparent hover:border-green-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-black/80 border border-green-400/50 hover:scale-110 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-green-400" />
              ) : (
                <Menu className="h-6 w-6 text-green-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-green-400/30 bg-black/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium font-mono transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? 'text-black bg-green-400 shadow-lg shadow-green-400/50'
                        : 'text-green-400 hover:text-black hover:bg-green-400/90'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}