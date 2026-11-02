import { useEffect, useRef } from 'react';

// Stacked sheets: every child section of the returned ref sticks once its bottom reaches the bottom of
// the screen (or its top reaches the top, if it's shorter than the screen), so it holds still and fades
// out while the next section comes up over it. A section that's fully covered gets .is-covered, which
// hides it so the browser stops painting it (and lets animations inside skip their work).
export default function useStackedSections() {
  const ref = useRef(null);

  useEffect(() => {
    const sheets = [...ref.current.children];
    let frame = null;

    const cover = () => {
      frame = null;
      const vh = window.innerHeight;
      sheets.forEach((sheet, i) => {
        const next = sheets[i + 1];
        if (!next) return;
        const top = next.getBoundingClientRect().top;
        // Fades out as the next section comes up, gone by the time that's 80% of the way up the screen.
        const fade = Math.min(1, Math.max(0, 1 - top / vh) / 0.8);
        sheet.style.opacity = fade > 0 ? (1 - fade).toFixed(3) : '';
        sheet.classList.toggle('is-covered', top <= 0);
      });
    };
    const measure = () => {
      const vh = window.innerHeight;
      sheets.forEach((sheet) => sheet.style.setProperty('--stack-top', `${Math.min(0, vh - sheet.offsetHeight)}px`));
      cover();
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(cover);
    };

    const sizeObserver = new ResizeObserver(measure);
    sheets.forEach((sheet) => sizeObserver.observe(sheet));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      sizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      if (frame !== null) cancelAnimationFrame(frame);
      sheets.forEach((sheet) => {
        sheet.classList.remove('is-covered');
        sheet.style.opacity = '';
      });
    };
  }, []);

  return ref;
}
