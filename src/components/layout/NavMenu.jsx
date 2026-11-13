import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const containsPath = (item, pathname) =>
  item.to === pathname || (item.children ?? []).some((child) => containsPath(child, pathname));

// `depth` 0 is the bar itself. `flyout` is the side nested panels open on ('left' for menus near the
// right edge of the screen); it is set on a top-level item in data/navigation and inherited below it.
function NavItem({ item, onNavigate, depth = 0, flyout }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const side = item.flyout ?? flyout;

  // Collapse again once a link has been followed.
  useEffect(() => setOpen(false), [pathname]);

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} end onClick={onNavigate}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  // Desktop panels open on hover or keyboard focus via CSS; on mobile tapping the label toggles them.
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
        {depth > 0 && <i className={`bi bi-chevron-${side === 'left' ? 'left' : 'right'} nav-caret`} aria-hidden="true" />}
      </a>
      <ul className={[open && 'dropdown-active', depth > 0 && side === 'left' && 'flyout-left'].filter(Boolean).join(' ') || undefined}>
        {item.children.map((child) => (
          <NavItem key={child.label} item={child} onNavigate={onNavigate} depth={depth + 1} flyout={side} />
        ))}
      </ul>
    </li>
  );
}

export default function NavMenu({ items, mobileOpen, onToggleMobile, onNavigate }) {
  // A hover menu would stay open after its link is clicked, because the pointer is still over it. This
  // holds every panel shut from the click until the pointer leaves the menu.
  const [closing, setClosing] = useState(false);
  const navigate = () => {
    setClosing(true);
    // The clicked link keeps focus, which would hold its panel open (panels also open on focus).
    document.activeElement?.blur?.();
    onNavigate?.();
  };

  return (
    <nav id="navmenu" className={`navmenu${closing ? ' is-closing' : ''}`} onMouseLeave={() => setClosing(false)}>
      <ul>
        {items.map((item) => (
          <NavItem key={item.label} item={item} onNavigate={navigate} />
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
