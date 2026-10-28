import { Link, useParams } from 'react-router-dom';

import HomeHeading from '../components/home/HomeHeading';
import SplitText from '../components/common/SplitText';
import PortfolioScene from '../components/portfolio/PortfolioScene';
import { portfolioGroups } from '../data/home';
import { portfolioLinks } from '../data/navigation';
import { portfolios } from '../data/portfolios';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useScrollSpy from '../hooks/useScrollSpy';
import { paths } from '../routes/paths';
import NotFoundPage from './NotFoundPage';
import '../styles/portfolio.css';

const pad = (n) => String(n).padStart(2, '0');
const YEARS = new Date().getFullYear() - 1980;
const iconFor = (slug) => portfolioLinks.find((link) => link.to === paths.portfolio(slug))?.icon ?? 'bi-grid';

// Smooth-scrolls to an in-page section without touching the router (the sticky offset comes from scroll-margin).
const jumpTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Moves a soft highlight under the pointer across a capability card.
const trackSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

function SectionNav({ sections, active }) {
  return (
    <nav className="pf-nav" aria-label="On this page">
      <div className="container">
        <div className="pf-nav-inner">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`pf-nav-link${active === section.id ? ' is-active' : ''}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={(e) => jumpTo(e, section.id)}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function NeighbourCard({ portfolio, direction }) {
  return (
    <Link to={paths.portfolio(portfolio.slug)} className={`pf-neighbour pf-neighbour--${direction}`}>
      <div className="pf-neighbour-media">
        <img src={portfolio.image} alt="" loading="lazy" />
      </div>
      <div className="pf-neighbour-body">
        <span className="lp-eyebrow">
          {direction === 'prev' ? (
            <>
              <i className="bi bi-arrow-left" /> Previous
            </>
          ) : (
            <>
              Next <i className="bi bi-arrow-right" />
            </>
          )}
        </span>
        <h3>{portfolio.title.join(' ')}</h3>
        <p>{portfolio.heading}</p>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const { slug } = useParams();
  const index = portfolios.findIndex((p) => p.slug === slug);
  const portfolio = portfolios[index];
  useDocumentTitle(portfolio?.title.join(' '));

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'proof', label: 'Track record' },
    ...(portfolio?.brochures.length ? [{ id: 'downloads', label: 'Downloads' }] : []),
    { id: 'more', label: 'More portfolios' },
  ];
  const active = useScrollSpy(sections.map((section) => section.id));

  if (!portfolio) return <NotFoundPage />;
  const { title, image, imageAlt, heading, paragraphs, capabilities, offerings, highlight, brochures, cta } = portfolio;
  const group = portfolioGroups.find((g) => g.slugs.includes(slug));
  const [lead, ...rest] = paragraphs;
  const prev = portfolios[(index - 1 + portfolios.length) % portfolios.length];
  const next = portfolios[(index + 1) % portfolios.length];

  return (
    <div className="lp pf">
      {/* ---- Hero ---- */}
      <section className="pf-hero">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <nav className="pf-crumbs hero-stage" style={{ '--stage': 0 }} aria-label="Breadcrumb">
                <Link to={paths.home}>Home</Link>
                <i className="bi bi-chevron-right" />
                <a href={`${paths.home}#portfolios`}>Portfolios</a>
                {group && (
                  <>
                    <i className="bi bi-chevron-right" />
                    <span>{group.label}</span>
                  </>
                )}
              </nav>
              <h1 className="hero-stage" style={{ '--stage': 1 }}>
                {title[0]} <span>{title[1]}</span>
              </h1>
              <p className="pf-hero-lead hero-stage" style={{ '--stage': 2 }}>
                {heading}
              </p>
              <div className="lp-actions hero-stage" style={{ '--stage': 3 }}>
                <Link to={paths.contact} className="lp-btn lp-btn--dark">
                  Talk to an expert
                </Link>
                <a href="#capabilities" className="lp-btn lp-btn--light" onClick={(e) => jumpTo(e, 'capabilities')}>
                  See capabilities
                </a>
              </div>
              <ul className="pf-hero-stats hero-stage" style={{ '--stage': 4 }}>
                <li>
                  <strong>{pad(capabilities.items.length)}</strong> core capabilities
                </li>
                <li>
                  <strong>{pad(offerings.items.length)}</strong> technology areas
                </li>
                <li>
                  <strong>{YEARS}+</strong> years of delivery
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="pf-hero-visual hero-stage" style={{ '--stage': 2 }}>
                <div className="pf-scene">
                  <PortfolioScene slug={slug} label={`Animated illustration: ${title.join(' ')}`} />
                </div>
                <span className="pf-hero-badge">
                  <i className={`bi ${iconFor(slug)}`} />
                </span>
                {offerings.items.slice(0, 3).map((item, i) => (
                  <span key={item.title} className={`pf-float pf-float--${i + 1}`}>
                    <i className={`bi ${item.icon}`} />
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pf-ticker" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {offerings.items.flatMap((item) =>
              item.text.split(' · ').map((token) => (
                <li key={`${item.title}-${token}`}>
                  <i className={`bi ${item.icon}`} />
                  {token}
                </li>
              )),
            )}
          </ul>
        ))}
      </div>

      <SectionNav sections={sections} active={active} />

      {/* ---- Overview ---- */}
      <section id="overview" className="lp-section pf-anchor">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="pf-sticky" data-aos="fade-up">
                <span className="lp-eyebrow">Overview</span>
                <h2 className="pf-side-title">{title.join(' ')}</h2>
                <div className="pf-photo" data-aos="reveal">
                  <img src={image} alt={imageAlt} loading="lazy" data-parallax="0.06" />
                </div>
              </div>
            </div>
            <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
              <p className="pf-lead">{lead}</p>
              {rest.map((text) => (
                <p key={text} className="pf-text">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section id="capabilities" className="lp-section pf-anchor">
        <div className="container">
          <HomeHeading title={capabilities.title} text={capabilities.subtitle} />
          <div className="pf-bento">
            {capabilities.items.map((item, i) => (
              <article
                key={item.title}
                className={`pf-cap${i === 0 ? ' pf-cap--feature' : ''}`}
                onPointerMove={trackSpotlight}
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <div className="pf-cap-top">
                  <span className="pf-cap-icon">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <span className="pf-cap-index">{pad(i + 1)}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Technologies ---- */}
      <section id="technologies" className="lp-section pf-anchor">
        <div className="container">
          <HomeHeading title={offerings.title} text={offerings.subtitle || 'The platforms and tools we deliver with.'} />
          <div className="pf-stack">
            {offerings.items.map((item, i) => (
              <div key={item.title} className="pf-stack-row" data-aos="fade-up" data-aos-delay={i * 50}>
                <div className="pf-stack-title">
                  <i className={`bi ${item.icon}`} />
                  <h3>{item.title}</h3>
                </div>
                <ul className="pf-stack-chips">
                  {item.text.split(' · ').map((token) => (
                    <li key={token}>{token}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Track record ---- */}
      <section id="proof" className="lp-section pf-anchor">
        <div className="container">
          <div className="pf-proof" data-aos="fade-up">
            <span className="pf-proof-icon">
              <i className={`bi ${highlight.icon}`} />
            </span>
            <div>
              <span className="lp-eyebrow">Track record</span>
              <h2>
                <SplitText text={highlight.title} />
              </h2>
              <p>{highlight.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Downloads ---- */}
      {brochures.length > 0 && (
        <section id="downloads" className="lp-section pf-anchor">
          <div className="container">
            <HomeHeading title="Downloads" text="Brochures and technical specifications." />
            <div className="row g-3">
              {brochures.map((brochure) => (
                <div key={brochure.href} className="col-md-6" data-aos="fade-up">
                  <a href={brochure.href} target="_blank" rel="noreferrer" className="pf-download">
                    <span className="pf-download-icon">
                      <i className="bi bi-file-earmark-pdf" />
                    </span>
                    <span>
                      <strong>{brochure.label.replace(/^Download\s+/i, '')}</strong>
                      <small>PDF · opens in a new tab</small>
                    </span>
                    <span className="pf-download-arrow" aria-hidden="true">
                      <i className="bi bi-arrow-down" />
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- CTA ---- */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-cta" data-aos="fade-up">
            <h2>
              <SplitText text={cta.title} />
            </h2>
            <p>{cta.text}</p>
            <div className="lp-actions">
              <Link to={paths.contact} className="lp-btn lp-btn--white">
                Start a conversation
              </Link>
              <a href={`${paths.home}#portfolios`} className="lp-btn lp-btn--ghost">
                All portfolios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- More portfolios ---- */}
      <section id="more" className="lp-section pf-anchor pf-more">
        <div className="container">
          <HomeHeading title="More portfolios" text="Keep exploring what we deliver." />
          <div className="row g-3">
            <div className="col-md-6" data-aos="fade-up">
              <NeighbourCard portfolio={prev} direction="prev" />
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <NeighbourCard portfolio={next} direction="next" />
            </div>
          </div>
          <div className="lp-chips pf-all" data-aos="fade-up">
            {portfolios.map((p) => (
              <Link key={p.slug} to={paths.portfolio(p.slug)} className={`lp-chip${p.slug === slug ? ' is-active' : ''}`}>
                <i className={`bi ${iconFor(p.slug)}`} />
                {p.title.join(' ')}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
