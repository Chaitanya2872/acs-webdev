import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { aboutChapters, certifications, stats } from '../../data/home';
import { portfolioLinks } from '../../data/navigation';
import useCountUp from '../../hooks/useCountUp';
import { scrollToY } from '../../hooks/useSmoothScroll';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const [years, clients, , offices] = stats;

function Figure({ stat }) {
  const [ref, value] = useCountUp(stat.value);

  return (
    <div className="lp-chapter-figure" ref={ref}>
      <span className="lp-chapter-figure-value">
        {value}
        {stat.suffix && <sup>{stat.suffix}</sup>}
      </span>
      <span className="lp-chapter-figure-label">{stat.label}</span>
    </div>
  );
}

// Each chapter's one visual: the founding photo, the nine practices, or the proof points.
function ChapterVisual({ chapter }) {
  if (chapter.key === 'who') {
    return (
      <div className="lp-chapter-photo">
        <img src="/assets/img/about-1.jpg" alt="ACS Technologies history" loading="lazy" />
        <div className="lp-chapter-badge">
          <Figure stat={years} />
        </div>
        <ul className="lp-chapter-founders" aria-label="Founders' institutions">
          {chapter.founders.map((name, i) => (
            <li key={name} style={{ '--k': i }}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (chapter.key === 'what') {
    return (
      <ul className="lp-chapter-practices">
        {portfolioLinks.map((link, i) => (
          <li key={link.to} style={{ '--k': i }}>
            <Link to={link.to}>
              <i className={`bi ${link.icon}`} aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="lp-chapter-proof">
      <div className="lp-chapter-figures">
        <Figure stat={clients} />
        <Figure stat={offices} />
        <div className="lp-chapter-figure">
          <span className="lp-chapter-figure-value lp-chapter-figure-value--text">BSE · NSE</span>
          <span className="lp-chapter-figure-label">Publicly listed</span>
        </div>
      </div>
      <div className="lp-certs">
        {certifications.map((cert, i) => (
          <a
            key={cert.standard}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="lp-chip"
            style={{ '--k': i }}
            title={`${cert.name} — view certificate`}
          >
            <i className={`bi ${cert.icon ?? 'bi-patch-check-fill'}`} />
            {cert.standard}
          </a>
        ))}
      </div>
    </div>
  );
}

const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// About as a short story in three chapters. On wide screens the section pins while it's scrolled
// through and the chapters glide past one at a time: each drifts up and fades out as the next drifts
// in, tied to the scroll but eased towards it frame by frame so it never jerks. An index on the left
// tracks progress (and jumps to a chapter on click). On small screens the chapters simply stack.
export default function AboutSection() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const [active, setActive] = useState(0);
  const count = aboutChapters.length;

  useEffect(() => {
    const section = sectionRef.current;
    const wide = window.matchMedia('(min-width: 992px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = null;
    let shown = null; // the eased progress actually drawn

    const draw = () => {
      section.style.setProperty('--progress', shown.toFixed(4));
      setActive(Math.min(count - 1, Math.floor(shown * count)));
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        if (!wide.matches) {
          panel.style.opacity = '';
          panel.style.transform = '';
          panel.style.visibility = '';
          return;
        }
        // Distance from this chapter's centre, in chapters; the first and last hold at the ends.
        let d = shown * count - (i + 0.5);
        if ((i === 0 && d < 0) || (i === count - 1 && d > 0)) d = 0;
        const opacity = 1 - smoothstep(0.28, 0.56, Math.abs(d));
        panel.style.opacity = opacity.toFixed(3);
        panel.style.transform = `translate3d(0, ${(-d * 90).toFixed(1)}px, 0)`;
        panel.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
      });
    };

    const tick = () => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const target = span > 0 ? clamp01(-rect.top / span) : 0;
      if (shown === null || still) shown = target;
      else shown += (target - shown) * 0.2;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      draw();
      if (shown !== target) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [count]);

  const goTo = (i) => {
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    scrollToY(rect.top + window.scrollY + ((i + 0.5) / count) * span);
  };

  return (
    <section id="about" className="lp-section lp-chapters" ref={sectionRef} style={{ '--chapters': count }}>
      <div className="lp-chapters-stage">
        <div className="container lp-chapters-grid">
          <nav className="lp-chapters-nav" aria-label="About ACS">
            <span className="lp-eyebrow">About ACS</span>
            <ol>
              {aboutChapters.map((chapter, i) => (
                <li key={chapter.key} className={i === active ? 'is-active' : undefined}>
                  <button type="button" onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                    <span className="lp-chapters-num">{String(i + 1).padStart(2, '0')}</span>
                    {chapter.kicker}
                  </button>
                </li>
              ))}
            </ol>
            <span className="lp-chapters-track" aria-hidden="true">
              <span />
            </span>
          </nav>

          <div className="lp-chapters-panels">
            {aboutChapters.map((chapter, i) => (
              <article
                key={chapter.key}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={`lp-chapter lp-chapter--${chapter.key}${i === active ? ' is-active' : ''}`}
              >
                <div className="lp-chapter-copy">
                  <span className="lp-chapter-kicker">
                    {String(i + 1).padStart(2, '0')} — {chapter.kicker}
                  </span>
                  <h2 className="lp-chapter-title">{chapter.title}</h2>
                  <p className="lp-chapter-text">{chapter.text}</p>
                </div>
                <div className="lp-chapter-visual">
                  <ChapterVisual chapter={chapter} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
