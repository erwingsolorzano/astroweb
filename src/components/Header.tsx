import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Experiencia', href: '#experiencia' },
  { name: 'Educación', href: '#educacion' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-20 bg-mandarin px-5 pt-3 md:px-10 md:pt-[22px]">
      <div className="grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#sobre-mi"
          aria-label="Erwing Solórzano, ir al inicio"
          className="inline-flex min-h-11 min-w-11 items-center justify-self-start font-display text-[30px] leading-none tracking-[-0.01em] text-forest"
        >
          ES
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-11">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label inline-flex min-h-11 items-center font-semibold text-ink transition-colors duration-200 hover:text-cream"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span aria-hidden="true" className="hidden md:block" />

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center rounded-full bg-forest text-crest md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h14M3 14h14" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 flex flex-col bg-forest px-5 pb-10 pt-3 text-crest md:hidden"
        >
          <div className="flex items-center justify-between">
            <a
              href="#sobre-mi"
              onClick={closeMenu}
              className="inline-flex min-h-11 min-w-11 items-center font-display text-[30px] leading-none text-crest"
            >
              ES
            </a>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              autoFocus
              className="grid h-11 w-11 place-items-center rounded-full bg-crest text-forest"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" />
              </svg>
            </button>
          </div>

          <nav aria-label="Principal móvil" className="mt-10">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href} className="border-t-2 border-forest-line last:border-b-2">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-[64px] items-center font-display text-[30px] uppercase leading-none text-crest"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
