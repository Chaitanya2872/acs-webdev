import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import SplitText from '../components/common/SplitText';
import HomeHeading from '../components/home/HomeHeading';
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

// Every client once, A to Z, remembering each sector it appears under. Mixing the sectors together is
// what makes the wall work: picking a sector lights up names scattered right across it.
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
    }))
    .sort((a, b) => a.search.localeCompare(b.search));
})();

const YEARS = new Date().getFullYear() - 1980;

export default function ClientsPage() {
  useDocumentTitle('Clients');
  const [sector, setSector] = useState(null); // null = every sector
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const lit = useMemo(
    () =>
      clients.map(
        (client) => (sector === null || client.sectors.includes(sector)) && (!needle || client.search.includes(needle)),
      ),
    [sector, needle],
  );
  const litCount = lit.filter(Boolean).length;
  const filtered = sector !== null || needle !== '';

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

      {/* ---- The wall of names ---- */}
      <section className="lp-section">
        <div className="container">
          <div className="cl-wall-grid">
            <aside className="cl-rail">
              <span className="lp-eyebrow">Spotlight a sector</span>
              <ol className="cl-sectors">
                <li>
                  <button type="button" aria-pressed={sector === null} onClick={() => setSector(null)}>
                    <span>Everyone</span>
                    <span className="cl-sector-count">{clients.length}</span>
                  </button>
                </li>
                {sectors.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-pressed={sector === item.index}
                      onClick={() => setSector(sector === item.index ? null : item.index)}
                    >
                      <span>{item.label}</span>
                      <span className="cl-sector-count">{item.count}</span>
                    </button>
                  </li>
                ))}
              </ol>

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

              <p className="cl-readout" aria-live="polite">
                {filtered ? (
                  <>
                    <strong>{litCount}</strong> of {clients.length} lit
                    <button
                      type="button"
                      onClick={() => {
                        setSector(null);
                        setQuery('');
                      }}
                    >
                      Reset
                    </button>
                  </>
                ) : (
                  <>Pick a sector or type a name to light it up.</>
                )}
              </p>
            </aside>

            <ul className={`cl-wall${filtered ? ' is-filtered' : ''}`} aria-label="Our clients, A to Z">
              {clients.map((client, i) => (
                <li key={client.name} className={lit[i] ? 'is-lit' : 'is-dim'} aria-hidden={lit[i] ? undefined : true}>
                  <span className="cl-name" data-sectors={client.sectorText}>
                    {client.name}
                  </span>
                </li>
              ))}
            </ul>
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
