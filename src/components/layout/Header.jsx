import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { mainNav } from '../../data/navigation';
import { company, socialLinks } from '../../data/site';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import NavMenu from './NavMenu';

const linkedIn = socialLinks.find((link) => link.icon === 'bi-linkedin');

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The template's CSS keys the mobile drawer off a class on <body>.
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen);
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header id="header" className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <a href={company.phone.href}>{company.phone.display}</a>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href={linkedIn.href} className="linkedin" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to={paths.home} className="logo d-flex align-items-center">
            <Logo width={60} />
          </Link>

          <div className="acs-exchange-ticker d-none d-xl-flex align-items-center ms-4">
            <span>
              BSE Scrip Code:&nbsp;<strong>{company.bseScripCode}</strong>
            </span>
            <span className="acs-ticker-sep">|</span>
            <span>
              NSE Symbol:&nbsp;<strong>{company.nseSymbol}</strong>
            </span>
          </div>

          <NavMenu
            items={mainNav}
            mobileOpen={mobileOpen}
            onToggleMobile={() => setMobileOpen((open) => !open)}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
