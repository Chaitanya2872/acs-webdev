import { useEffect } from 'react';

// Moves every [data-parallax="<speed>"] element vertically in proportion to its distance from the
// viewport centre. Positive speeds drift slower than the page (background feel), negative ones faster.
export default function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const mid = window.innerHeight / 2;
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0;
        const offset = (rect.top + rect.height / 2 - mid) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // New pages mount new parallax layers; position them before the first scroll.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mutations.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
}
