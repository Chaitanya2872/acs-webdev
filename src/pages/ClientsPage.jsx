import { Link } from 'react-router-dom';

import SplitText from '../components/common/SplitText';
import HomeHeading from '../components/home/HomeHeading';
import VerticalLogoScroller from '../components/ui/VerticalLogoScroller';
import { clientSectors } from '../data/clients';
import { clientLogos } from '../data/home';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { paths } from '../routes/paths';
import '../styles/clients.css';

// Short names for the sector columns; the data's own label is the fallback.
const SHORT_LABELS = {
  'Government Sector': 'Government',
  'Corporate / Private Sector': 'Corporate',
  "MNC's": 'Multinationals',
  'Academic /Research': 'Academic & research',
  Banks: 'Banks',
};

const sectors = clientSectors.map((sector, index) => ({
  index,
  label: SHORT_LABELS[sector.label] ?? sector.label,
  count: sector.clients.length,
}));

// Every client once, A to Z, remembering each sector it appears under.
const clients = (() => {
  const byName = new Map();
  clientSectors.forEach((sector, index) => {
    sector.clients.forEach((name) => {
      if (!byName.has(name)) byName.set(name, { name, sectors: [] });
      byName.get(name).sectors.push(index);
    });
  });
  return [...byName.values()].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
})();

// One scrolling column per sector. Short lists are repeated so a column never runs out of names, and
// the loop time follows the list's length so every column drifts at about the same pace.
const MIN_COLUMN_ITEMS = 14;
const SECONDS_PER_ITEM = 2.6;
const columns = sectors.map((sector) => {
  const own = clients.filter((client) => client.sectors.includes(sector.index));
  const repeats = Math.ceil(MIN_COLUMN_ITEMS / own.length);
  const run = Array.from({ length: repeats }, () => own).flat();
  return {
    ...sector,
    speed: `${Math.round(run.length * SECONDS_PER_ITEM)}s`,
    direction: sector.index % 2 ? 'down' : 'up',
    items: run.map((client, i) => (
      <span key={`${client.name}-${i}`} className="cl-scroll-name">
        {client.name}
      </span>
    )),
  };
});

const YEARS = new Date().getFullYear() - 1980;

export default function ClientsPage() {
  useDocumentTitle('Clients');
  return (
    <div className="lp cl">
      {/* ---- Hero ---- */}
      <section className="cl-hero">
        <div className="container">
          <span className="lp-eyebrow hero-stage" style={{ '--stage': 0 }}>
            Clients
          </span>
          <h1 className="hero-stage" style={{ '--stage': 1 }}>
            {clients.length} names.
            <br />
            <span>{YEARS} years of trust.</span>
          </h1>
          <div className="cl-hero-row hero-stage" style={{ '--stage': 2 }}>
            <p>
              Government departments, defence labs, banks, universities and global enterprises have put their technology in
              our hands. Their success is our success, and every name below is a relationship we are proud of.
            </p>
            <ul className="cl-logos" aria-label="Some of our clients">
              {clientLogos.map((logo) => (
                <li key={logo.name}>
                  <img src={logo.image} alt={logo.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Scrolling columns, one per sector ---- */}
      <section className="lp-section">
        <div className="container">
          <HomeHeading title="Trusted across every sector" text="Hover a column to pause it." />
          <div className="cl-scrollers">
            {columns.map((column) => (
              <div key={column.label} className="cl-scroller" data-tone={column.index}>
                <h3>
                  {column.label} <span>{column.count}</span>
                </h3>
                <VerticalLogoScroller logos={column.items} speed={column.speed} direction={column.direction} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Partnership ---- */}
      <section className="lp-section">
        <div className="container">
          <HomeHeading title="Partnerships" text="Products we stand behind." />
          <div className="cl-partner" data-aos="fade-up">
            <div className="cl-partner-logo">
              <img src="/assets/img/partners/trueconf_comp.png" alt="TrueConf" loading="lazy" />
            </div>
            <div className="cl-partner-copy">
              <span className="cl-partner-kicker">Product partner</span>
              <h3>Enterprise video conferencing, with TrueConf.</h3>
              <p>
                ACS Technologies is a product partner of TrueConf, bringing its enterprise video conferencing solution to
                our clientele.
              </p>
              <a href="https://trueconf.in/" target="_blank" rel="noreferrer" className="lp-btn lp-btn--dark">
                Visit TrueConf <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="lp-section cl-cta-section">
        <div className="container">
          <div className="lp-cta" data-aos="fade-up">
            <h2>
              <SplitText text="There is room" />
              <br />
              <span>
                <SplitText text="for one more name." start={3} />
              </span>
            </h2>
            <p>Tell us about your project and the right people from ACS will get back to you.</p>
            <div className="lp-actions">
              <Link to={paths.contact} className="lp-btn lp-btn--white">
                Start a conversation
              </Link>
              <Link to={`${paths.home}#portfolios`} className="lp-btn lp-btn--ghost">
                See what we do
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
