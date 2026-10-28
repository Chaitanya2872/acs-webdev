import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { heroNews } from '../../data/home';
import { company } from '../../data/site';
import { paths } from '../../routes/paths';
import PortfolioOrbit from './PortfolioOrbit';

const NEWS_INTERVAL_MS = 4500;

function Announcement() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroNews.length), NEWS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lp-announce" aria-live="polite">
      <span className="lp-announce-badge">New</span>
      <span className="lp-announce-track">
        {heroNews.map((item, i) => (
          <span key={item.text} className={`lp-announce-item${i === index ? ' is-active' : ''}`}>
            {item.text}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);

  // Scroll-linked exit: --hero-out runs 0 → 1 over the hero's height and drives the fade/lift in CSS.
  useEffect(() => {
    const hero = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = null;
    const update = () => {
      frame = null;
      const out = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.9)));
      hero.style.setProperty('--hero-out', out.toFixed(3));
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="lp-hero" ref={ref}>
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-5 lp-hero-copy">
            <div className="hero-stage" style={{ '--stage': 0 }}>
              <Announcement />
            </div>
            <h1 className="hero-stage" style={{ '--stage': 1 }}>
              Explore.
              <br />
              Innovate.
              <br />
              <span>Excel.</span>
            </h1>
            <p className="lp-hero-lead hero-stage" style={{ '--stage': 2 }}>
              Four decades of AI, software, smart facilities and IT infrastructure for government, defence and enterprise.
            </p>
            <div className="lp-actions hero-stage" style={{ '--stage': 3 }}>
              <a href="#portfolios" className="lp-btn lp-btn--dark">
                Explore portfolios
              </a>
              <Link to={paths.contact} className="lp-btn lp-btn--light">
                Talk to us
              </Link>
            </div>
            <ul className="lp-hero-meta hero-stage" style={{ '--stage': 4 }}>
              <li>Since 1980</li>
              <li>BSE {company.bseScripCode}</li>
              <li>NSE {company.nseSymbol}</li>
            </ul>
          </div>

          <div className="col-lg-7">
            <PortfolioOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
