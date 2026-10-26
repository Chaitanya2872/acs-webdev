import { stats } from '../../data/home';
import useCountUp from '../../hooks/useCountUp';

function Stat({ stat, delay }) {
  const [ref, value] = useCountUp(stat.value);

  return (
    <div className="col-6 col-md-4 col-lg" data-aos="fade-up" data-aos-delay={delay}>
      <div className="home-stat" ref={ref}>
        <i className={`bi ${stat.icon}`} />
        <span className="home-stat-value">
          {value}
          {stat.suffix}
        </span>
        <span className="home-stat-label">{stat.label}</span>
      </div>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section id="stats" className="home-stats">
      <div className="container">
        <div className="row g-3 g-lg-4 justify-content-center">
          {stats.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
