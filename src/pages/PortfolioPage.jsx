import { Link, useParams } from 'react-router-dom';

import ScrollHint from '../components/common/ScrollHint';
import SectionTitle from '../components/common/SectionTitle';
import { portfolios } from '../data/portfolios';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { paths } from '../routes/paths';
import NotFoundPage from './NotFoundPage';

const delay = (i) => 100 + i * 50;

function CardGrid({ section, variant }) {
  return (
    <div className="container" data-aos="fade-up">
      <div className="section-title text-center mb-5">
        <h2>{section.title}</h2>
        {section.subtitle && <p>{section.subtitle}</p>}
      </div>
      <div className={`row ${variant === 'capability' ? 'g-4' : 'g-3'}`}>
        {section.items.map((item, i) => (
          <div key={item.title} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={delay(i)}>
            {variant === 'capability' ? (
              <div className="card h-100 border-0 shadow-sm p-4 capability-card">
                <div className="mb-3">
                  <i className={`bi ${item.icon} fs-2 accent-icon`} />
                </div>
                <h5>{item.title}</h5>
                <p className="mb-0">{item.text}</p>
              </div>
            ) : (
              <div className="p-4 rounded text-center h-100 offering-card">
                <h6 className="fw-bold mb-2">
                  <i className={`bi ${item.icon} me-2`} />
                  {item.title}
                </h6>
                <p className="mb-0 small text-muted">{item.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { slug } = useParams();
  const portfolio = portfolios.find((p) => p.slug === slug);
  useDocumentTitle(portfolio?.title.join(' '));

  if (!portfolio) return <NotFoundPage />;
  const { title, image, imageAlt, heading, paragraphs, capabilities, offerings, highlight, brochures, cta } = portfolio;

  return (
    <>
      <section>
        <SectionTitle lead={title[0]} emphasis={title[1]} />
        <div className="container services-page-container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
              <img src={image} alt={imageAlt} className="w-100 rounded" />
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h4>{heading}</h4>
              {paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="light-background py-5">
        <CardGrid section={capabilities} variant="capability" />
      </section>

      <section className="py-5">
        <CardGrid section={offerings} variant="offering" />
      </section>

      <section className="py-5 portfolio-cta">
        <div className="container" data-aos="fade-up">
          <div className="row align-items-center gy-3 mb-5 pb-5 portfolio-cta-highlight">
            <div className="col-auto text-center">
              <i className={`bi ${highlight.icon} portfolio-cta-icon`} />
            </div>
            <div className="col">
              <h4>{highlight.title}</h4>
              <p className="mb-0">{highlight.text}</p>
            </div>
          </div>

          {brochures.length > 0 && (
            <div className="row justify-content-center g-3 mb-5">
              {brochures.map((brochure, i) => (
                <div key={brochure.href} className="col-auto">
                  <a href={brochure.href} target="_blank" rel="noreferrer" className={i ? 'btn-hero-secondary' : 'btn-hero-primary'}>
                    {brochure.label}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h3>{cta.title}</h3>
              <p className="portfolio-cta-text">{cta.text}</p>
              <Link to={paths.contact} className="btn-hero-primary">
                Start a Conversation
              </Link>
              <Link to={`${paths.home}#services`} className="btn-hero-secondary">
                Explore Our Portfolios
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ScrollHint />
    </>
  );
}
