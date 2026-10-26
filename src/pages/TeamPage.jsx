import SectionTitle from '../components/common/SectionTitle';
import { coreTeam, executiveTeam } from '../data/team';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function TeamPage() {
  useDocumentTitle('Team');

  return (
    <section id="team" className="team section light-background">
      <SectionTitle caption="Team" lead="Our Core" emphasis="Team" />

      <div className="container">
        {coreTeam.map((member, i) => (
          <div key={member.name} className={`row${i ? ' mt-5' : ''}`}>
            <div className="col-lg-6 my-3" data-aos="fade-up">
              <div className="d-flex justify-content-center align-items-center">
                <img src={member.image} alt={member.name} className="key-team-img" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6 my-3" data-aos="fade-up">
              <h4>{member.name}</h4>
              <p className="key-team-designation">{member.designation}</p>
              {member.bio.map((paragraph) => (
                <p key={paragraph} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section>
        <SectionTitle lead="Executive" emphasis="Team" />
        <div className="container">
          <div className="team2-container">
            {executiveTeam.map((member, i) => (
              <div key={member.name} className="col-lg-2 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={i ? 200 : 100}>
                <div className="team-member">
                  <div className="member-img">
                    <img src={member.image} className="img-fluid w-100" alt={member.name} loading="lazy" />
                    {member.linkedin && (
                      <div className="social">
                        <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>
                          <i className="bi bi-linkedin" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span>{member.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
