import { useEffect, useRef } from 'react';

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Sections rise into place as they scroll in: every child section of the returned ref after the first
// gets --enter, from 0 as its top reaches the bottom of the screen to 1 once it's 45% of the way up
// (eased), and the CSS lifts, scales and fades its content by it. Tied to the scroll, so it plays in
// both directions.
export default function useSectionMotion() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const sections = [...ref.current.children].slice(1);
    let frame = null;

    const update = () => {
      frame = null;
      const vh = window.innerHeight;
      sections.forEach((section) => {
        const t = clamp01((vh - section.getBoundingClientRect().top) / (vh * 0.55));
        section.style.setProperty('--enter', (1 - (1 - t) ** 3).toFixed(4));
      });
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
      sections.forEach((section) => section.style.removeProperty('--enter'));
    };
  }, []);

  return ref;
}
