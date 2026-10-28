import { testimonials } from '../../data/home';
import HomeHeading from './HomeHeading';

export default function Testimonials() {
  return (
    <section className="lp-section">
      <div className="container">
        <HomeHeading title="Testimonials" text="What our clients say." />
        <div className="row g-3">
          {testimonials.map((item, i) => (
            <div key={item.text} className="col-md-4" data-aos="fade-up" data-aos-delay={i * 100}>
              <figure className="lp-quote">
                <blockquote>&ldquo;{item.text}&rdquo;</blockquote>
                <figcaption>
                  <span className="lp-avatar lp-avatar--static">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  ACS client
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
