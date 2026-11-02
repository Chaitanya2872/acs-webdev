import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { mainNav } from '../../data/navigation';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import NavMenu from './NavMenu';

// Plain, full-width bar: logo on the left, the four main sections centred, and Contact on the right.
export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The template's CSS keys the mobile drawer off a class on <body>.
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen);
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header id="header" className="header header--plain sticky-top">
      <div className="header-bar">
        <Link to={paths.home} className="logo d-flex align-items-center" aria-label="ACS Technologies home">
          <Logo width={44} />
        </Link>

        <NavMenu
          items={mainNav}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((open) => !open)}
          onNavigate={() => setMobileOpen(false)}
        />

        <div className="header-actions">
          <Link to={paths.contact} className="header-contact">
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
}
