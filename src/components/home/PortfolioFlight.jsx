import { useEffect, useRef } from 'react';

import { portfolioCards } from '../../data/home';

const STAGGER = 0.06; // each card leaves a little after the previous one
const ARC = 0.08; // how high (in viewport heights) a card lifts mid-flight
const FOLLOW = 0.09; // per-frame easing toward the scroll position, so wheel steps glide instead of jump

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (1 - Math.cos(Math.PI * t)) / 2;
const lerp = (a, b, t) => a + (b - a) * t;

// Scroll-linked hand-off between the hero orbit and the portfolio grid: as the reader scrolls from the
// hero to the grid, each orbiting image lifts off the tower, arcs over and drops into its grid slot.
// Fixed-position stand-ins do the flying; the real cards are hidden only while their stand-in is in the air.
export default function PortfolioFlight() {
  const layerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const flyers = Array.from(layerRef.current.children);
    const count = flyers.length;
    let frame = null;
    let shown = null; // eased progress actually drawn

    const setVisible = (el, visible) => {
      if (el) el.style.visibility = visible ? '' : 'hidden';
    };

    const update = () => {
      frame = null;
      const grid = document.querySelector('.lp-masonry');
      if (!grid) return;

      const vh = window.innerHeight;
      const end = grid.getBoundingClientRect().top + window.scrollY - vh * 0.45;
      const begin = Math.min(60, end * 0.1);
      const target = end > begin ? clamp01((window.scrollY - begin) / (end - begin)) : 1;
      shown = shown === null ? target : shown + (target - shown) * FOLLOW;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      const p = shown;
      let flying = false;

      portfolioCards.forEach((card, i) => {
        const flyer = flyers[i];
        const src = document.querySelector(`.lp-orbit-card[data-slug="${card.slug}"]`);
        const dstMedia = document.querySelector(`.lp-card[data-slug="${card.slug}"] .lp-card-media`);
        const dstImg = dstMedia?.querySelector('img');
        const own = clamp01((p - i * STAGGER) / (1 - (count - 1) * STAGGER));

        if (p <= 0 || !src) {
          flyer.style.opacity = '0';
          setVisible(src, true);
          setVisible(dstImg, true);
          return;
        }
        setVisible(src, false);
        if (own >= 1) {
          flyer.style.opacity = '0';
          setVisible(dstImg, true);
          return;
        }

        flying = true;
        setVisible(dstImg, false);
        const e = ease(own);
        const lift = Math.sin(Math.PI * e);
        const a = src.getBoundingClientRect();
        // A card filtered out of the grid has no slot: it just falls away and fades.
        const b = dstMedia?.getBoundingClientRect() ?? { left: a.left, top: a.top + vh, width: a.width, height: a.height };
        const x = lerp(a.left, b.left, e);
        const y = lerp(a.top, b.top, e) - lift * vh * ARC;
        const w = lerp(a.width, b.width, e);
        const h = lerp(a.height, b.height, e);
        const startOpacity = parseFloat(src.style.opacity) || 1;
        const tilt = (i % 2 ? -1 : 1) * 5 * lift;

        flyer.style.width = `${w.toFixed(1)}px`;
        flyer.style.height = `${h.toFixed(1)}px`;
        flyer.style.transform = `perspective(900px) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateX(${(lift * 16).toFixed(1)}deg) rotateZ(${tilt.toFixed(1)}deg)`;
        flyer.style.opacity = String(dstMedia ? lerp(startOpacity, 1, e) : (1 - e) * startOpacity);
        flyer.style.boxShadow = `0 ${(lift * 30).toFixed(0)}px ${(lift * 60).toFixed(0)}px -24px rgba(0, 30, 70, ${(0.1 + lift * 0.22).toFixed(2)})`;
        flyer.style.borderRadius = `${lerp(14, 16, e).toFixed(1)}px`;
      });

      // While cards are mid-air the orbit keeps moving under them, so keep tracking every frame.
      if (flying || shown !== target) schedule();
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
      document.querySelectorAll('.lp-orbit-card, .lp-card-media img').forEach((el) => setVisible(el, true));
    };
  }, []);

  return (
    <div ref={layerRef} className="lp-flight" aria-hidden="true">
      {portfolioCards.map((card) => (
        <div key={card.slug} className="lp-flyer">
          <img src={card.image} alt="" />
        </div>
      ))}
    </div>
  );
}
