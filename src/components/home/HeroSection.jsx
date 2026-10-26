import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { heroNews } from '../../data/home';
import { company } from '../../data/site';
import { paths } from '../../routes/paths';
import HeroGlobe from './HeroGlobe';

const NEWS_INTERVAL_MS = 4500;

function NewsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroNews.length), NEWS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-hero-news" aria-live="polite">
      <span className="home-hero-news-label">
        <i className="bi bi-broadcast-pin" /> Latest
      </span>
      <span className="home-hero-news-track">
        {heroNews.map((item, i) => (
          <span key={item.text} className={`home-hero-news-item${i === index ? ' is-active' : ''}`}>
            {item.text}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="home-hero">
      {/* Background layers drift at different speeds for depth */}
      <div className="home-hero-layer home-hero-glow" data-parallax="0.35" aria-hidden="true" />
      <div className="home-hero-layer home-hero-grid" data-parallax="0.18" aria-hidden="true" />

      <div className="container home-hero-inner">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6 home-hero-copy">
            <div className="home-hero-eyebrow hero-stage" style={{ '--stage': 0 }}>
              <span>Since 1980</span>
              <span>BSE {company.bseScripCode}</span>
              <span>NSE {company.nseSymbol}</span>
            </div>
            <h1 className="hero-stage" style={{ '--stage': 1 }}>
              Explore. Innovate. <span className="home-hero-gradient">Excel.</span>
            </h1>
            <p className="home-hero-lead hero-stage" style={{ '--stage': 2 }}>
              Over four decades of delivering cutting-edge AI, software, smart solutions and IT infrastructure for government,
              defence and enterprise.
            </p>
            <div className="d-flex flex-wrap gap-3 hero-stage" style={{ '--stage': 3 }}>
              <a href="#portfolios" className="btn-hero-primary m-0">
                Explore Our Portfolios
              </a>
              <Link to={paths.contact} className="btn-hero-secondary">
                Talk to Us
              </Link>
            </div>
            <div className="hero-stage" style={{ '--stage': 4 }}>
              <NewsTicker />
            </div>
          </div>

          <div className="col-lg-6 d-none d-lg-block">
            <div className="home-hero-visual" data-parallax="-0.12">
              <div className="home-hero-globe">
                <HeroGlobe />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#stats" className="home-hero-scroll" aria-label="Scroll to content">
        <span />
      </a>
    </section>
  );
}
