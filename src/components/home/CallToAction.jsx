import { Link } from 'react-router-dom';

import { company } from '../../data/site';
import { paths } from '../../routes/paths';

export default function CallToAction() {
  return (
    <section className="home-cta">
      <div className="home-hero-layer home-hero-glow" data-parallax="0.25" aria-hidden="true" />
      <div className="container home-cta-inner text-center" data-aos="zoom-in">
        <h2>Let&apos;s build what&apos;s next, together.</h2>
        <p>From AI and custom software to infrastructure and smart facilities — tell us what you need.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to={paths.contact} className="btn-hero-primary m-0">
            Start a Conversation
          </Link>
          <a href={company.phone.href} className="btn-hero-secondary">
            <i className="bi bi-telephone me-2" />
            {company.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
