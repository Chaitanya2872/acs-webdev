import { useState } from 'react';
import { Link } from 'react-router-dom';

import { services } from '../../data/home';
import HomeHeading from './HomeHeading';

// Services as a numbered list between hairlines. On wide screens a single photo sits beside the list
// and cross-fades to whichever service is hovered or focused; on small screens each row shows its own.
export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="lp-section lp-services">
      <div className="container">
        <HomeHeading title="Services" text="How we work with you, from first build to everyday operations." />
        <div className="lp-services-grid">
          <ol className="lp-services-list">
            {services.map((service, i) => (
              <li key={service.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <Link
                  to={service.to}
                  className={`lp-services-row${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="lp-services-thumb">
                    <img src={service.image} alt="" loading="lazy" />
                  </span>
                  <span className="lp-services-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lp-services-body">
                    <span className="lp-services-tag">{service.tag}</span>
                    <span className="lp-services-title">{service.title}</span>
                    <span className="lp-services-text">{service.summary}</span>
                  </span>
                  <i className="bi bi-arrow-up-right lp-services-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <div className="lp-services-media" aria-hidden="true" data-aos="fade-up" data-aos-delay="150">
            {services.map((service, i) => (
              <img
                key={service.title}
                src={service.image}
                alt=""
                loading="lazy"
                className={i === active ? 'is-active' : undefined}
              />
            ))}
            <span className="lp-services-caption">{services[active].tag}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
