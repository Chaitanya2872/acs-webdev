import { Link } from 'react-router-dom';

import { footerInvestorLinks, footerServiceLinks } from '../../data/navigation';
import { company, offices, socialLinks } from '../../data/site';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import NewsletterForm from './NewsletterForm';

const headOffice = offices[0];
const followLinks = socialLinks.filter((link) => link.href !== '#');

function LinkColumn({ title, links }) {
  return (
    <div className="col-6 col-md-3">
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

function ContactCard({ icon, label, children, href, external }) {
  const body = (
    <>
      <span className="ft-card-icon">
        <i className={`bi ${icon}`} />
      </span>
      <span className="ft-card-label">{label}</span>
      <span className="ft-card-value">{children}</span>
      {href && (
        <span className="ft-card-arrow" aria-hidden="true">
          <i className="bi bi-arrow-up-right" />
        </span>
      )}
    </>
  );

  if (!href) return <div className="ft-card">{body}</div>;
  return (
    <a className="ft-card" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {body}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer ft">
      <div className="container">
        <div className="row g-3 ft-top">
          <div className="col-lg-5">
            <div className="ft-newsletter">
              <span className="ft-eyebrow">Newsletter</span>
              <h4>
                Stay in the loop.
                <br />
                <span>News from ACS, once in a while.</span>
              </h4>
              <p>Product launches, project milestones and investor updates. No spam, unsubscribe anytime.</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="ft-cards">
              <ContactCard icon="bi-envelope" label="Email us" href={`mailto:${company.email}`}>
                {company.email}
              </ContactCard>
              <ContactCard icon="bi-telephone" label="Call us" href={company.phone.href}>
                {company.phone.display}
              </ContactCard>
              <ContactCard icon="bi-geo-alt" label={`${headOffice.group}, ${headOffice.city}`} href={headOffice.mapUrl} external>
                {headOffice.address}
              </ContactCard>
              <div className="ft-card">
                <span className="ft-card-icon">
                  <i className="bi bi-people" />
                </span>
                <span className="ft-card-label">Follow us</span>
                <span className="ft-socials">
                  {followLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                      <i className={`bi ${link.icon}`} />
                    </a>
                  ))}
                </span>
                <Link to={paths.contact} className="ft-card-link">
                  All offices <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row gy-4 ft-sitemap">
          <div className="col-md-6">
            <Logo width={52} />
            <h5>{company.name}</h5>
            <p>{company.tagline}</p>
            <a href={company.iotiqUrl} target="_blank" rel="noreferrer" className="ft-iotiq">
              Visit IOTIQ <i className="bi bi-arrow-up-right" />
            </a>
          </div>
          <LinkColumn title="Services" links={footerServiceLinks} />
          <LinkColumn title="Investors" links={footerInvestorLinks} />
        </div>

        <div className="ft-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName} All rights reserved.
          </span>
          <span>
            BSE {company.bseScripCode} · NSE {company.nseSymbol}
          </span>
        </div>
      </div>
    </footer>
  );
}
