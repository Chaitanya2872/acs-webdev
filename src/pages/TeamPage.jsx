import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import SplitText from '../components/common/SplitText';
import HomeHeading from '../components/home/HomeHeading';
import { coreTeam, executiveTeam } from '../data/team';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { paths } from '../routes/paths';
import '../styles/team.css';

const isIndependent = (member) => /independent/i.test(member.designation);
const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'leadership', label: 'Leadership', test: (member) => !isIndependent(member) },
  { key: 'independent', label: 'Independent Directors', test: isIndependent },
];

// Full-bio profile in a native <dialog>: focus is trapped, Esc closes, arrow keys step through people.
function ProfileDialog({ members, index, onClose, onStep }) {
  const ref = useRef(null);
  const member = index === null ? null : members[index];

  useEffect(() => {
    const dialog = ref.current;
    if (member && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!member && dialog.open) dialog.close();
  }, [member]);

  useEffect(() => {
    const dialog = ref.current;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    const onClosed = () => {
      document.body.style.overflow = '';
      onClose();
    };
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('close', onClosed);
    return () => {
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('close', onClosed);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <dialog
      ref={ref}
      className="tm-dialog"
      aria-label={member ? `${member.name} profile` : 'Profile'}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {member && (
        <div className="tm-dialog-body" key={member.name}>
          <div className="tm-dialog-photo">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="tm-dialog-content">
            <div className="tm-dialog-bar">
              <span className="lp-tag">{member.designation}</span>
              <button type="button" className="tm-icon-btn" aria-label="Close profile" onClick={() => ref.current.close()}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <h2>{member.name}</h2>
            <div className="tm-dialog-bio">
              {member.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="tm-dialog-nav">
              <button type="button" className="tm-icon-btn" aria-label="Previous person" onClick={() => onStep(-1)}>
                <i className="bi bi-arrow-left" />
              </button>
              <span>
                {index + 1} / {members.length}
              </span>
              <button type="button" className="tm-icon-btn" aria-label="Next person" onClick={() => onStep(1)}>
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function TeamPage() {
  useDocumentTitle('Team');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);

  const members = coreTeam.filter(FILTERS.find((f) => f.key === filter).test);
  const count = members.length;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir) => setOpen((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  return (
    <div className="lp tm">
      {/* ---- Hero ---- */}
      <section className="tm-hero">
        <div className="container">
          <span className="lp-eyebrow hero-stage" style={{ '--stage': 0 }}>
            Team
          </span>
          <h1 className="hero-stage" style={{ '--stage': 1 }}>
            The people behind
            <br />
            <span>four decades of delivery.</span>
          </h1>
          <div className="tm-hero-row hero-stage" style={{ '--stage': 2 }}>
            <p>
              Engineers, operators, veterans and governance leaders who have taken ACS from mainframes to AI, for some of
              India&apos;s most demanding clients.
            </p>
            <ul className="tm-hero-stats">
              <li>
                <strong>{coreTeam.length}</strong> Board &amp; leadership
              </li>
              <li>
                <strong>{executiveTeam.length}</strong> Executive leads
              </li>
              <li>
                <strong>{new Date().getFullYear() - 1980}+</strong> Years
              </li>
            </ul>
          </div>
          <div className="tm-strip hero-stage" style={{ '--stage': 3 }} aria-hidden="true">
            {[...coreTeam, ...executiveTeam].map((member) => (
              <img key={member.name} src={member.image} alt="" />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Board & leadership ---- */}
      <section className="lp-section">
        <div className="container">
          <HomeHeading title="Board & leadership" text="Select a profile to read the full story." />
          <div className="lp-chips" role="tablist" aria-label="Filter team" data-aos="fade-up">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                className={`lp-chip${filter === f.key ? ' is-active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="tm-grid" key={filter}>
            {members.map((member, i) => (
              <button key={member.name} type="button" className="tm-card" style={{ '--i': i }} onClick={() => setOpen(i)}>
                <div className="tm-card-photo">
                  <img src={member.image} alt="" loading="lazy" />
                  <span className="tm-card-cta">
                    Read profile <i className="bi bi-arrow-up-right" />
                  </span>
                </div>
                <span className="tm-card-name">{member.name}</span>
                <span className="tm-card-role">{member.designation}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Executive team ---- */}
      <section className="lp-section">
        <div className="container">
          <HomeHeading title="Executive team" text="Leading delivery across every practice." />
          <div className="row g-3">
            {executiveTeam.map((member, i) => (
              <div key={member.name} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <div className="tm-exec">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="tm-exec-body">
                    <span className="tm-exec-name">{member.name}</span>
                    <span className="tm-exec-role">{member.designation}</span>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="tm-icon-btn tm-exec-link"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <i className="bi bi-linkedin" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="lp-section tm-cta-section">
        <div className="container">
          <div className="lp-cta" data-aos="fade-up">
            <h2>
              <SplitText text="Work with the team" />
              <br />
              <span>
                <SplitText text="that has done it before." start={4} />
              </span>
            </h2>
            <p>Tell us about your project and the right people from ACS will get back to you.</p>
            <div className="lp-actions">
              <Link to={paths.contact} className="lp-btn lp-btn--white">
                Start a conversation
              </Link>
              <Link to={paths.boardOfDirectors} className="lp-btn lp-btn--ghost">
                Board of Directors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProfileDialog members={members} index={open} onClose={close} onStep={step} />
    </div>
  );
}
