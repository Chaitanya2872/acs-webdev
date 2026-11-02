import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { portfolioCards, portfolioGroups } from '../../data/home';
import { portfolioLinks } from '../../data/navigation';
import TiltedGridHero from '../ui/TiltedGridHero';
import HomeHeading from './HomeHeading';

const iconFor = (to) => portfolioLinks.find((link) => link.to === to)?.icon ?? 'bi-grid';

// Portfolio images stream round a curved band (TiltedGridHero), centre flat and ends bending towards
// the viewer. The band itself is decorative, so the portfolios are also listed as links beneath it;
// the chips filter both.
export default function PortfolioGrid() {
  const [group, setGroup] = useState('all');
  const chips = [{ key: 'all', label: 'All' }, ...portfolioGroups];
  const cards = useMemo(
    () => (group === 'all' ? portfolioCards : portfolioCards.filter((card) => card.group === group)),
    [group],
  );
  // Stable per filter, so the band doesn't re-preload its images on every render.
  const images = useMemo(() => cards.map((card) => ({ src: card.image, alt: card.title })), [cards]);

  return (
    <section id="portfolios" className="lp-section lp-tilt-section">
      <div className="lp-tilt-head">
        <HomeHeading title="Portfolios" text="Nine practices, one accountable partner." />
        <div className="lp-chips" role="tablist" aria-label="Filter portfolios">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              role="tab"
              aria-selected={group === chip.key}
              className={`lp-chip${group === chip.key ? ' is-active' : ''}`}
              onClick={() => setGroup(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <TiltedGridHero
        key={group}
        images={images}
        className="lp-tilt"
        tileHeight={40}
        aspectRatio={4 / 3}
        axis={50}
        curve={72}
        speed={3.5}
        fade={10}
      />

      <ul className="lp-tilt-links">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link to={card.to} className="lp-tilt-link">
              <i className={`bi ${iconFor(card.to)}`} aria-hidden="true" />
              {card.title}
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
