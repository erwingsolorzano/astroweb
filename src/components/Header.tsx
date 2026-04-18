import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Sobre mí', href: '#sobre-mi' },
  { name: 'Experiencia', href: '#experiencia' },
  { name: 'Educación', href: '#educacion' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' },
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
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMenuOpen(false);

    const target = document.querySelector(href) as HTMLElement | null;
    if (!target) return;

    window.setTimeout(() => {
      const headerHeight = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      window.history.replaceState(null, '', href);
    }, 320);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/75 border-b border-white/10 shadow-2xl shadow-black/20 md:backdrop-blur-2xl' 
          : 'bg-black/40 md:bg-transparent border-b border-transparent'
      }`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#sobre-mi" aria-label="Ir al inicio" className="inline-flex items-center">
              <img
                src="./iconES.webp"
                alt="Logo de Erwing Solorzano"
                className="w-10 h-10 object-contain transition-transform duration-300 cursor-pointer hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-medium tracking-tight rounded-full transition-all duration-300 hover:scale-105 ${
                  activeSection === item.href.slice(1)
                    ? 'text-black bg-green-400 shadow-lg shadow-green-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:scale-105 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium tracking-tight transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? 'text-black bg-green-400 shadow-lg shadow-green-400/20'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
