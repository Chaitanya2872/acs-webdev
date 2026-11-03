import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const containsPath = (item, pathname) =>
  item.to === pathname || (item.children ?? []).some((child) => containsPath(child, pathname));

function NavItem({ item, onNavigate }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} end onClick={onNavigate}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  // No chevrons: desktop dropdowns open on hover via CSS, and on mobile tapping the label toggles them.
  return (
    <li className="dropdown">
      <a
        href="#"
        className={containsPath(item, pathname) || open ? 'active' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((value) => !value);
        }}
      >
        <span>{item.label}</span>
      </a>
      <ul className={open ? 'dropdown-active' : undefined} style={item.alignLeft ? { left: '-90%' } : undefined}>
        {item.children.map((child) => (
          <NavItem key={child.label} item={child} onNavigate={onNavigate} />
        ))}
      </ul>
    </li>
  );
}

export default function NavMenu({ items, mobileOpen, onToggleMobile, onNavigate }) {
  return (
    <nav id="navmenu" className="navmenu">
      <ul>
        {items.map((item) => (
          <NavItem key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </ul>
      <i
        className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? 'bi-x' : 'bi-list'}`}
        role="button"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={onToggleMobile}
      />
    </nav>
  );
}
