import { certifications, stats } from '../../data/home';
import useCountUp from '../../hooks/useCountUp';

const FOUNDED = 1980;
const DECADES = [1980, 1990, 2000, 2010, 2020];

// The headline figure (years in business) as a dark feature card with a timeline that fills on reveal.
function LeadStat({ stat }) {
  const [ref, value] = useCountUp(stat.value, 2000);

  return (
    <div className="lp-stat lp-stat--lead" ref={ref} data-aos="fade-up">
      <span className="lp-stat-eyebrow">
        <i className={`bi ${stat.icon}`} />
        Since {FOUNDED}
      </span>
      <span className="lp-stat-value">
        {value}
        <sup>{stat.suffix}</sup>
      </span>
      <span className="lp-stat-label">{stat.label}</span>
      <div className="lp-timeline" aria-hidden="true">
        <span className="lp-timeline-bar" />
        {DECADES.map((year) => (
          <span key={year} className="lp-timeline-mark">
            {year}
          </span>
        ))}
        <span className="lp-timeline-mark is-now">Now</span>
      </div>
    </div>
  );
}

function Stat({ stat, delay }) {
  const [ref, value] = useCountUp(stat.value);

  return (
    <div className="lp-stat" ref={ref} data-aos="fade-up" data-aos-delay={delay}>
      <span className="lp-stat-icon">
        <i className={`bi ${stat.icon}`} />
      </span>
      <span className="lp-stat-value">
        {value}
        {stat.suffix && <sup>{stat.suffix}</sup>}
      </span>
      <span className="lp-stat-label">{stat.label}</span>
    </div>
  );
}

// Headline figures as a bento: years in business leads, the rest in a 2×2 beside it,
// then the certificates as chips that open the PDF.
export default function StatsBand() {
  const [lead, ...rest] = stats;

  return (
    <section id="stats" className="lp-section lp-stats-section">
      <div className="container">
        <div className="lp-stats">
          <LeadStat stat={lead} />
          {rest.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={(i + 1) * 100} />
          ))}
        </div>
        <div className="lp-certs" data-aos="fade-up">
          <span className="lp-certs-label">Certified</span>
          {certifications.map((cert) => (
            <a
              key={cert.standard}
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              className="lp-chip"
              title={`${cert.name} — view certificate`}
            >
              <i className={`bi ${cert.icon ?? 'bi-patch-check-fill'}`} />
              {cert.standard}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
