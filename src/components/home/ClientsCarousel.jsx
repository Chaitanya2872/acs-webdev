import { Link } from 'react-router-dom';

import { clientLogos } from '../../data/home';
import { paths } from '../../routes/paths';
import GridBackground from '../ui/GridBackground';
import HomeHeading from './HomeHeading';

function ClientList({ clients, hidden }) {
  return (
    <ul className="lp-marquee-list" aria-hidden={hidden || undefined}>
      {clients.map((client) => (
        <li key={client.name}>
          <figure className="lp-client">
            <div className="lp-client-logo">
              {/* Not lazy: off to the side in a clipped, moving track, lazy logos can be late to load. */}
              <img src={client.image} alt={hidden ? '' : client.name} />
            </div>
            <figcaption>{client.name}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

// One endless row: the list is rendered twice and the track slides by exactly one copy, then repeats.
function Marquee({ clients, reverse, hidden }) {
  return (
    <div className={`lp-marquee${reverse ? ' lp-marquee--reverse' : ''}`}>
      <div className="lp-marquee-track" style={{ '--marquee-duration': `${clients.length * 5}s` }}>
        <ClientList clients={clients} hidden={hidden} />
        <ClientList clients={clients} hidden />
      </div>
    </div>
  );
}

// Client logos drift past in two endless rows, one each way, on a panel ruled with the grid
// backdrop. Hovering pauses them; reduced motion makes each a plain row that scrolls by hand.
export default function ClientsCarousel() {
  return (
    <section id="clients" className="lp-section lp-clients">
      <div className="container">
        <HomeHeading title="Clients" text="Trusted by defence, government and enterprise.">
          <Link to={paths.clients} className="lp-link">
            All clients <i className="bi bi-arrow-right" />
          </Link>
        </HomeHeading>

        <div className="lp-clients-panel" data-aos="fade-up">
          <GridBackground glow="corner" />
          <Marquee clients={clientLogos} />
          {/* The second row repeats the same clients, so it's hidden from screen readers. */}
          <Marquee clients={[...clientLogos].reverse()} reverse hidden />
        </div>
      </div>
    </section>
  );
}
