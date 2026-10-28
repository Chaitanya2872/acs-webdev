import { Link } from 'react-router-dom';

import { company } from '../../data/site';
import { paths } from '../../routes/paths';
import SplitText from '../common/SplitText';

export default function CallToAction() {
  return (
    <section className="lp-section lp-cta-section">
      <div className="container">
        <div className="lp-cta" data-aos="fade-up">
          <h2>
            <SplitText text="Let's build what's next," />
            <br />
            <span>
              <SplitText text="together." start={4} />
            </span>
          </h2>
          <p>From AI and custom software to infrastructure and smart facilities, tell us what you need.</p>
          <div className="lp-actions">
            <Link to={paths.contact} className="lp-btn lp-btn--white">
              Start a conversation
            </Link>
            <a href={company.phone.href} className="lp-btn lp-btn--ghost">
              <i className="bi bi-telephone" />
              {company.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
