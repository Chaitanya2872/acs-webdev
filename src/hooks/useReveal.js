import { useEffect } from 'react';

// Reveals [data-aos] elements as they scroll into view by adding .aos-animate (styled in styles/motion.css).
// A MutationObserver picks up content that mounts later (lazy routes, tab panels), so nothing stays hidden.
export default function useReveal() {
  useEffect(() => {
    const revealAll = () => document.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('aos-animate'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      const mutations = new MutationObserver(revealAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const intersections = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('aos-animate');
          intersections.unobserve(entry.target);
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    // Tracked per effect run (not on the DOM) so a re-run, e.g. under StrictMode, re-observes everything.
    const observed = new WeakSet();
    const observeNew = () =>
      document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        intersections.observe(el);
      });

    observeNew();
    const mutations = new MutationObserver(observeNew);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      intersections.disconnect();
    };
  }, []);
}
