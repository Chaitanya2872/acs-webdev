import { Link } from 'react-router-dom';

import { portfolioCards } from '../../data/home';
import { portfolioLinks } from '../../data/navigation';
import TiltedGridHero from '../ui/TiltedGridHero';
import HomeHeading from './HomeHeading';

const iconFor = (to) => portfolioLinks.find((link) => link.to === to)?.icon ?? 'bi-grid';

// Portfolio images stream round a curved band (TiltedGridHero), centre flat and ends bending towards
// the viewer. The band itself is decorative, so the portfolios are also listed as links beneath it;
// each image carries its portfolio's name in the middle.
const cards = portfolioCards;
// Stable, so the band doesn't re-preload its images on every render.
const images = cards.map((card) => ({ src: card.image, alt: card.title, label: card.title }));

export default function PortfolioGrid() {
  return (
    <section id="portfolios" className="lp-section lp-tilt-section">
      <div className="lp-tilt-head">
        <HomeHeading title="Portfolios" text="Nine practices, one accountable partner." />
      </div>

      <TiltedGridHero
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
