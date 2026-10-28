import { aboutParagraphs } from '../../data/home';

export default function AboutSection() {
  const [lead, ...rest] = aboutParagraphs;

  return (
    <section id="about" className="lp-section lp-about">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-5">
            <div className="lp-about-aside" data-aos="fade-up">
              <span className="lp-eyebrow">About</span>
              <span className="lp-about-year">1980</span>
              <p>Founded by engineers from IBM, Bell Labs &amp; ECIL.</p>
              <div className="lp-about-photo" data-aos="reveal">
                <img src="/assets/img/about-1.jpg" alt="ACS Technologies history" loading="lazy" data-parallax="0.06" />
              </div>
            </div>
          </div>
          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="120">
            <p className="lp-about-lead">{lead}</p>
            {rest.map((text) => (
              <p key={text} className="lp-about-text">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
