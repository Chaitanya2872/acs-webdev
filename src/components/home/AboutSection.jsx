import { Fragment, useEffect, useRef } from 'react';

import { aboutParagraphs, certifications, stats } from '../../data/home';
import useCountUp from '../../hooks/useCountUp';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - (1 - t) ** 3;
const countWords = (text) => text.split(' ').length;

// The collage: each photo flies in from the bottom right to its place on the left, a beat after the last.
const PHOTOS = [
  { src: '/assets/img/about-1.jpg', alt: 'ACS Technologies history', className: 'lp-about-photo--main' },
  { src: '/assets/img/portfolios/infrastructure.jpg', alt: '', className: 'lp-about-photo--side' },
  { src: '/assets/img/portfolios/ai.jpg', alt: '', className: 'lp-about-photo--foot' },
];

// A paragraph as numbered word spans, so the scroll can light it up one word at a time (via --lit).
const LitParagraph = ({ text, className, innerRef }) => (
  <p className={`lp-lit ${className}`} ref={innerRef}>
    {text.split(' ').map((word, i) => (
      <Fragment key={i}>
        {i > 0 && ' '}
        <span className="lp-lit-w" style={{ '--i': i }}>
          {word}
        </span>
      </Fragment>
    ))}
  </p>
);

function Kpi({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, index === 0 ? 2000 : 1600);

  return (
    <div className="lp-kpi" ref={ref} data-aos="fade-up" data-aos-delay={index * 90}>
      <i className={`bi ${stat.icon} lp-kpi-icon`} aria-hidden="true" />
      <span className="lp-kpi-value">
        {value}
        {stat.suffix && <sup>{stat.suffix}</sup>}
      </span>
      <span className="lp-kpi-label">{stat.label}</span>
    </div>
  );
}

// About, with the headline figures folded in. Scroll-linked both ways: the lead lights up word by word
// as it's read, the KPIs count up beneath it, then the photos sweep in from the bottom right beside the
// founding story. Scrolling back up plays it in reverse.
export default function AboutSection() {
  const [lead, story] = aboutParagraphs;
  const leadRef = useRef(null);
  const storyRef = useRef(null);
  const collageRef = useRef(null);
  const photoRefs = useRef([]);

  useEffect(() => {
    const texts = [
      { el: leadRef.current, words: countWords(lead) },
      { el: storyRef.current, words: countWords(story) },
    ];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      texts.forEach(({ el, words }) => el.style.setProperty('--lit', String(words)));
      return undefined;
    }
    const collage = collageRef.current;
    let frame = null;

    const update = () => {
      frame = null;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Copy: lights up as it travels from 85% of the way down the screen towards the top, a word at a time.
      texts.forEach(({ el, words }) => {
        const rect = el.getBoundingClientRect();
        const read = clamp01((vh * 0.85 - rect.top) / (rect.height + vh * 0.25));
        el.style.setProperty('--lit', (read * (words + 6)).toFixed(2));
      });

      // Photos: 0 as the collage's top enters the bottom of the screen, 1 once it's 40% of the way up.
      const enter = clamp01((vh - collage.getBoundingClientRect().top) / (vh * 0.6));
      photoRefs.current.forEach((photo, i) => {
        if (!photo) return;
        const t = easeOut(clamp01((enter - i * 0.12) / 0.7));
        const x = (1 - t) * Math.min(vw * 0.45, 560);
        const y = (1 - t) * 220;
        photo.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${((1 - t) * 6).toFixed(2)}deg) scale(${(0.86 + 0.14 * t).toFixed(3)})`;
        photo.style.opacity = clamp01(t * 2.5).toFixed(3);
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
    };
  }, [lead, story]);

  return (
    <section id="about" className="lp-section lp-about">
      <div className="container">
        <div className="lp-about-head" data-aos="fade-up">
          <span className="lp-eyebrow">About ACS</span>
          <span className="lp-about-since">
            <span className="lp-about-dot" aria-hidden="true" />
            Est. 1980 · Founded by engineers from IBM, Bell Labs &amp; ECIL
          </span>
        </div>

        <LitParagraph text={lead} className="lp-about-lead" innerRef={leadRef} />

        <div className="lp-kpis">
          {stats.map((stat, i) => (
            <Kpi key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="row gy-5 align-items-center lp-about-detail">
          <div className="col-lg-6">
            <div className="lp-about-collage" ref={collageRef}>
              {PHOTOS.map((photo, i) => (
                <figure
                  key={photo.src}
                  ref={(el) => {
                    photoRefs.current[i] = el;
                  }}
                  className={`lp-about-photo ${photo.className}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <span className="lp-about-year" aria-hidden="true">
              1980
            </span>
            <LitParagraph text={story} className="lp-about-text" innerRef={storyRef} />
            <div className="lp-certs" data-aos="fade-up">
              <span className="lp-certs-label">Certified</span>
              {certifications.map((cert) => (
                <a
                  key={cert.standard}
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="lp-chip"
                  title={`${cert.name} — view certificate`}
                >
                  <i className={`bi ${cert.icon ?? 'bi-patch-check-fill'}`} />
                  {cert.standard}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
