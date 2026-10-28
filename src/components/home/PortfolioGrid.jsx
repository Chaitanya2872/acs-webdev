import { useState } from 'react';
import { Link } from 'react-router-dom';

import { portfolioCards, portfolioGroups } from '../../data/home';
import { portfolioLinks } from '../../data/navigation';
import HomeHeading from './HomeHeading';

const iconFor = (to) => portfolioLinks.find((link) => link.to === to)?.icon ?? 'bi-grid';

// Varying image heights give the grid its staggered, masonry rhythm; the sequence shifts every
// three cards so neighbouring columns don't line up row for row.
const SHAPES = ['tall', 'wide', 'square'];
const shapeFor = (i) => SHAPES[(i + Math.floor(i / 3)) % SHAPES.length];

export default function PortfolioGrid() {
  const [group, setGroup] = useState('all');
  const chips = [{ key: 'all', label: 'All' }, ...portfolioGroups];
  const cards = group === 'all' ? portfolioCards : portfolioCards.filter((card) => card.group === group);

  return (
    <section id="portfolios" className="lp-section">
      <div className="container">
        <HomeHeading title="Portfolios" text="Nine practices, one accountable partner." />
        <div className="lp-chips" role="tablist" aria-label="Filter portfolios" data-aos="fade-up">
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

        <div className="lp-masonry" key={group}>
          {cards.map((card, i) => (
            <Link key={card.slug} to={card.to} className="lp-card lp-card-enter" data-slug={card.slug} style={{ '--i': i }}>
              <div className={`lp-card-media lp-card-media--${shapeFor(i)}`}>
                <img src={card.image} alt="" loading="lazy" />
                <span className="lp-avatar" aria-hidden="true">
                  <i className={`bi ${iconFor(card.to)}`} />
                </span>
                <span className="lp-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-up-right" />
                </span>
              </div>
              <div className="lp-card-body">
                <h3>{card.title}</h3>
                <p>{card.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
