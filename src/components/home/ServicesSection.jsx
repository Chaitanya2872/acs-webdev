import { Link } from 'react-router-dom';

import { services } from '../../data/home';
import HomeHeading from './HomeHeading';

export default function ServicesSection() {
  return (
    <section id="services" className="lp-section">
      <div className="container">
        <HomeHeading title="Services" text="How we work with you, from first build to everyday operations." />
        <div className="row g-3">
          {services.map((service, i) => (
            <div key={service.title} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 100}>
              <Link to={service.to} className="lp-service">
                <div className="lp-service-media" data-aos="reveal" data-aos-delay={i * 100 + 150}>
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <span className="lp-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="lp-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-up-right" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
