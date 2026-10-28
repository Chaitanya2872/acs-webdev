import { useEffect, useState } from 'react';

// Id of the last section whose top has scrolled past the reading line (just below the sticky header and
// section nav), for highlighting the matching link in an in-page nav.
export default function useScrollSpy(ids, offset = 180) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    const list = key.split('|');
    let frame = null;

    const update = () => {
      frame = null;
      let current = list[0];
      list.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      });
      // At the very bottom the last section may never reach the line, so let it win there.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = list[list.length - 1];
      setActive(current);
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
    };
  }, [key, offset]);

  return active;
}
