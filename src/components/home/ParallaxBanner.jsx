import { introParagraphs } from '../../data/home';

// Full-bleed image band whose background drifts behind the text as the page scrolls.
export default function ParallaxBanner() {
  return (
    <section className="home-banner">
      <div className="home-banner-bg" data-parallax="0.2" aria-hidden="true">
        <img src="/assets/img/home/homepage-image.png" alt="" loading="lazy" />
      </div>
      <div className="home-banner-overlay" aria-hidden="true" />
      <div className="container home-banner-inner">
        <div className="row align-items-center gy-4">
          <div className="col-lg-5" data-aos="fade-right">
            <h2>
              Pioneering <br />
              Future-Ready <br />
              <span className="home-hero-gradient">IT Solutions</span>
            </h2>
          </div>
          <div className="col-lg-6 offset-lg-1" data-aos="fade-left" data-aos-delay="150">
            {introParagraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
