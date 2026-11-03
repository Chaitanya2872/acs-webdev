import { Link } from 'react-router-dom';

import { footerCompanyLinks, footerInvestorLinks, footerServiceLinks } from '../../data/navigation';
import { company, socialLinks } from '../../data/site';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import SplitText from '../common/SplitText';
import NewsletterForm from './NewsletterForm';

const followLinks = socialLinks.filter((link) => link.href !== '#');

function LinkColumn({ title, links }) {
  return (
    <div className="ft-col">
      <h6>{title}</h6>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A plain footer: an invitation to get in touch, then the company and its contacts beside three link columns, one line of small print,
// then a closing "Thank you. Stay connected." whose words rise into place as it scrolls into view.
export default function Footer() {
  return (
    <footer className="footer ft">
      <div className="container">
        <div className="ft-lead">
          <h2>
            Let&apos;s build what&apos;s next, <span>together.</span>
          </h2>
          <Link to={paths.contact} className="ft-lead-cta">
            Start a conversation <i className="bi bi-arrow-right" />
          </Link>
        </div>

        <div className="ft-main">
          <div className="ft-brand">
            <Logo width={48} />
            <p>{company.tagline}</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.phone.href}>{company.phone.display}</a>
            <div className="ft-newsletter">
              <span>Newsletter</span>
              <NewsletterForm />
            </div>
          </div>
          <LinkColumn title="What we build" links={footerServiceLinks} />
          <LinkColumn title="For investors" links={footerInvestorLinks} />
          <LinkColumn title="Get to know us" links={footerCompanyLinks} />
        </div>

        <div className="ft-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName} All rights reserved.
          </span>
          <span>
            BSE {company.bseScripCode} · NSE {company.nseSymbol}
          </span>
          <span className="ft-socials">
            {followLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                <i className={`bi ${link.icon}`} />
              </a>
            ))}
            <a href={company.iotiqUrl} target="_blank" rel="noreferrer">
              IOTIQ <i className="bi bi-arrow-up-right" />
            </a>
          </span>
        </div>

        <p className="ft-thanks" data-aos="split">
          <span className="ft-thanks-line">
            <SplitText text="Thank you." />
          </span>
          <span className="ft-thanks-line ft-thanks-line--accent">
            <SplitText text="Stay connected." start={2} />
          </span>
        </p>
      </div>
    </footer>
  );
}
