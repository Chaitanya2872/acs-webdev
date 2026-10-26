import { testimonials } from '../../data/home';
import SectionTitle from '../common/SectionTitle';

export default function Testimonials() {
  return (
    <section className="home-testimonials section">
      <SectionTitle caption="Testimonials" lead="What Clients" emphasis="Say" />
      <div className="container">
        <div className="row g-4">
          {testimonials.map((item, i) => (
            <div key={item.text} className="col-md-4" data-aos="fade-up" data-aos-delay={i * 120}>
              <figure className="home-testimonial">
                <i className="bi bi-quote home-testimonial-mark" aria-hidden="true" />
                <blockquote>{item.text}</blockquote>
                <span className="home-testimonial-icon">
                  <i className={`bi ${item.icon}`} />
                </span>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
