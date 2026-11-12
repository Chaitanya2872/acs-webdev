import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import SplitText from '../components/common/SplitText';
import HomeHeading from '../components/home/HomeHeading';
import VerticalLogoScroller from '../components/ui/VerticalLogoScroller';
import { clientSectors } from '../data/clients';
import { clientLogos } from '../data/home';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { paths } from '../routes/paths';
import '../styles/clients.css';

// Short names for the sector switches; the data's own label is the fallback.
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

const logoByName = new Map(clientLogos.map((logo) => [logo.name.toLowerCase(), logo.image]));

// Letters for a client's circle: its own acronym when the name leads with one (IBM, DRDO), otherwise
// the initials of its first two meaningful words.
const SKIP = new Set(['of', 'the', 'and', 'for', 'dr', 'sri']);
const monogram = (name) => {
  const words = name
    .replace(/\(.*?\)/g, ' ')
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word && !SKIP.has(word.toLowerCase()));
  const [first = ''] = words;
  if (first.length >= 2 && first.length <= 4 && first === first.toUpperCase()) return first;
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
};

// Every client once, A to Z, remembering each sector it appears under.
const clients = (() => {
  const byName = new Map();
  clientSectors.forEach((sector, index) => {
    sector.clients.forEach((name) => {
      if (!byName.has(name)) byName.set(name, { name, sectors: [] });
      byName.get(name).sectors.push(index);
    });
  });
  return [...byName.values()]
    .map((client) => ({
      ...client,
      search: client.name.toLowerCase(),
      sectorText: client.sectors.map((i) => sectors[i].label).join(' · '),
      letters: monogram(client.name),
      logo: logoByName.get(client.name.toLowerCase()),
    }))
    .sort((a, b) => a.search.localeCompare(b.search));
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
      <span key={`${client.name}-${i}`} className="cl-chip">
        <span className={`cl-chip-dot${client.logo ? ' cl-chip-dot--logo' : ''}`} aria-hidden="true">
          {client.logo ? <img src={client.logo} alt="" loading="lazy" /> : client.letters}
        </span>
        {client.name}
      </span>
    )),
  };
});

const YEARS = new Date().getFullYear() - 1980;

export default function ClientsPage() {
  useDocumentTitle('Clients');
  const [sector, setSector] = useState(null); // null = every sector
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      clients.filter(
        (client) => (sector === null || client.sectors.includes(sector)) && (!needle || client.search.includes(needle)),
      ),
    [sector, needle],
  );

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

      {/* ---- Client cards ---- */}
      <section className="lp-section">
        <div className="container">
          <HomeHeading title="Full directory" text="Every client, A to Z." />
          <div className="cl-filters">
            <div className="cl-sectors" role="group" aria-label="Filter clients by sector">
              <button type="button" aria-pressed={sector === null} onClick={() => setSector(null)}>
                Everyone <span className="cl-sector-count">{clients.length}</span>
              </button>
              {sectors.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={sector === item.index}
                  data-tone={item.index}
                  onClick={() => setSector(sector === item.index ? null : item.index)}
                >
                  {item.label} <span className="cl-sector-count">{item.count}</span>
                </button>
              ))}
            </div>
            <label className="cl-search">
              <i className="bi bi-search" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a name"
                aria-label="Find a client by name"
              />
            </label>
          </div>

          <p className="cl-readout" aria-live="polite">
            Showing <strong>{shown.length}</strong> of {clients.length} clients
          </p>

          {shown.length ? (
            // Re-keyed per sector so the cards step in again whenever the filter changes.
            <ul key={sector ?? 'all'} className="cl-grid" aria-label="Our clients, A to Z">
              {shown.map((client, i) => (
                <li
                  key={client.name}
                  className="cl-card"
                  data-tone={client.sectors[0]}
                  style={{ '--i': Math.min(i, 24) }}
                >
                  <span className={`cl-circle${client.logo ? ' cl-circle--logo' : ''}`} aria-hidden="true">
                    {client.logo ? <img src={client.logo} alt="" loading="lazy" /> : client.letters}
                  </span>
                  <span className="cl-card-name">{client.name}</span>
                  <span className="cl-card-sector">{client.sectorText}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cl-empty">
              No client matches &ldquo;{query.trim()}&rdquo;.{' '}
              <button
                type="button"
                onClick={() => {
                  setSector(null);
                  setQuery('');
                }}
              >
                Show everyone
              </button>
            </p>
          )}
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
