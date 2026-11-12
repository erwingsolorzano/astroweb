import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-in reveal for React islands. Static components use the
 * `[data-reveal]` script in BaseLayout; islands must not have their DOM
 * mutated before hydration, so they manage the `is-revealed` class here.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, revealClass: isRevealed ? 'is-revealed' : '' };
}
