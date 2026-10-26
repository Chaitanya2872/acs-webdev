import { Link } from 'react-router-dom';

import { services } from '../../data/home';
import SectionTitle from '../common/SectionTitle';

export default function ServicesSection() {
  return (
    <section id="services" className="services section light-background">
      <SectionTitle caption="Services" lead="Our" emphasis="Services" />
      <div className="container">
        <div className="row gy-4">
          {services.map((service, i) => (
            <div key={service.title} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
              <div className="service-item position-relative">
                <div className="service-item-img-wrap">
                  <img src={service.image} alt={service.title} className="services-cards-img" loading="lazy" />
                </div>
                <div className="service-item-body">
                  <span className="service-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p className="text-justify">{service.text}</p>
                </div>
                <Link to={service.to} className="stretched-link" aria-label={service.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
