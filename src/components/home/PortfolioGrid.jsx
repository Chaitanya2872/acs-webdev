import { Link } from 'react-router-dom';

import { portfolioCards } from '../../data/home';
import { portfolioLinks } from '../../data/navigation';
import SectionTitle from '../common/SectionTitle';

const iconFor = (to) => portfolioLinks.find((link) => link.to === to)?.icon ?? 'bi-grid';

export default function PortfolioGrid() {
  return (
    <section id="portfolios" className="home-portfolios section">
      <SectionTitle caption="Portfolios" lead="What We" emphasis="Deliver" />
      <div className="container">
        <div className="row g-4">
          {portfolioCards.map((card, i) => (
            <div key={card.slug} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
              <Link to={card.to} className="home-portfolio-card">
                <div className="home-portfolio-media">
                  <img src={card.image} alt="" loading="lazy" />
                </div>
                <div className="home-portfolio-body">
                  <span className="home-portfolio-icon">
                    <i className={`bi ${iconFor(card.to)}`} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.tagline}</p>
                  <span className="home-portfolio-more">
                    Learn more <i className="bi bi-arrow-right" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
