import { Link } from 'react-router-dom';

import { footerInvestorLinks, footerServiceLinks } from '../../data/navigation';
import { company, socialLinks } from '../../data/site';
import Logo from '../common/Logo';
import NewsletterForm from './NewsletterForm';

function LinkColumn({ title, links }) {
  return (
    <div className="col-md-3 mb-4 footer-line ps-md-4">
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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h4>Join Our Newsletter</h4>
              <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-sitemap">
        <div className="row gy-4">
          <div className="col-md-3 mb-4">
            <Logo width={52} />
            <h5 className="mt-3 fw-bold">{company.name}</h5>
            <p className="mt-2 footer-muted">{company.tagline}</p>
            <div className="d-flex gap-2 mt-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer-social-icon" title={link.label} aria-label={link.label}>
                  <i className={`bi ${link.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Services" links={footerServiceLinks} />
          <LinkColumn title="Investors" links={footerInvestorLinks} />

          <div className="col-md-3 mb-4 footer-line ps-md-4">
            <h6>Contact Us</h6>
            <address className="footer-address">
              {company.address.map((line) => (
                <span key={line} className="d-block">
                  {line}
                </span>
              ))}
            </address>
            <p className="footer-contact">
              <i className="bi bi-telephone me-1" />
              <a href={company.phone.href}>{company.phone.display}</a>
            </p>
            <p className="footer-contact">
              <i className="bi bi-envelope me-1" />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p className="footer-contact">
              <i className="bi bi-globe me-1" />
              <a href={company.iotiqUrl} target="_blank" rel="noreferrer">
                Visit IOTIQ <i className="bi bi-arrow-up-right" />
              </a>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <hr />
            <p className="footer-copyright">
              © {new Date().getFullYear()} {company.legalName} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
