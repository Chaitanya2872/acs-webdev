import { useEffect, useState } from 'react';

// Current vertical scroll offset, updated on a passive listener.
export default function useScrollY() {
  const [scrollY, setScrollY] = useState(() => window.scrollY);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
}
