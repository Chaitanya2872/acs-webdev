import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { mainNav } from '../../data/navigation';
import { company } from '../../data/site';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import NavMenu from './NavMenu';

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The template's CSS keys the mobile drawer off a class on <body>.
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen);
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header id="header" className="header header--glass sticky-top">
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to={paths.home} className="logo d-flex align-items-center">
            <Logo width={44} />
          </Link>

          <div className="acs-exchange-ticker d-none d-xl-flex align-items-center">
            <span className="acs-ticker-dot" aria-hidden="true" />
            <span>
              BSE <strong>{company.bseScripCode}</strong>
            </span>
            <span className="acs-ticker-sep">·</span>
            <span>
              NSE <strong>{company.nseSymbol}</strong>
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
