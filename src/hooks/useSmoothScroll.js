import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

// Smooth, inertial wheel scrolling for the whole site (Lenis). Touch keeps the device's native
// scrolling, and it stays off for anyone who prefers reduced motion.
let lenis = null;

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

// Scroll the page to `top` (px), gliding unless `immediate`. Goes through Lenis when it's running,
// so code-driven scrolls ease exactly like the wheel does.
export function scrollToY(top, { immediate = false } = {}) {
  if (lenis) lenis.scrollTo(top, { immediate, force: true });
  else window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
}

// Scroll an element to the top of the screen, leaving room for the header via its scroll-margin-top.
export function scrollToElement(element) {
  if (!element) return;
  const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  scrollToY(element.getBoundingClientRect().top + window.scrollY - margin);
}
