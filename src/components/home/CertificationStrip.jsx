import { certifications } from '../../data/home';

export default function CertificationStrip() {
  return (
    <section className="cert-strip">
      <div className="container">
        <div className="cert-strip-label">Certifications &amp; Accreditations</div>
        <div className="cert-strip-tiles">
          {certifications.map((cert) => (
            <a
              key={cert.standard}
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              className="cert-tile"
              title={`View ${cert.label} Certificate`}
            >
              <div className="cert-tile-icon">
                <i className={`bi ${cert.icon ?? 'bi-patch-check-fill'}`} />
              </div>
              <div className="cert-tile-body">
                <span className="cert-standard">{cert.standard}</span>
                <span className="cert-name">{cert.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
