import { aboutParagraphs } from '../../data/home';
import SectionTitle from '../common/SectionTitle';

export default function AboutSection() {
  return (
    <section id="about" className="home-about section">
      <SectionTitle caption="About" lead="How It All" emphasis="Started" />
      <div className="container">
        <div className="row gy-5 align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="home-about-media">
              <div className="home-about-frame">
                <img src="/assets/img/about-1.jpg" alt="ACS Technologies History" loading="lazy" data-parallax="0.08" />
              </div>
              <div className="home-about-badge" data-parallax="-0.1">
                <span className="home-about-badge-year">1980</span>
                <span>Founded by engineers from IBM, Bell Labs &amp; ECIL</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="150">
            <div className="ps-lg-4">
              {aboutParagraphs.map((text) => (
                <p key={text} className="text-justify about-text">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
