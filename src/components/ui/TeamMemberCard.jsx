import '../../styles/team-member-card.css';

/* Ported from the emerald-ui "team-member-card" (MIT) to this project's stack (plain React + CSS, no
 * Tailwind/TypeScript/framer-motion): an editorial card with a tall portrait, the name in large display
 * type overlapping its edge, a circular call-to-action and a short bio. `position` flips the layout so
 * cards can alternate down a page. The entrance uses the site's own scroll reveal (data-aos).
 */

/**
 * @param {object} props
 * @param {'left'|'right'} [props.position='left']  Which side the portrait sits on.
 * @param {string} props.jobPosition
 * @param {string} props.firstName
 * @param {string} props.lastName
 * @param {string} props.imageUrl
 * @param {string} [props.description]
 * @param {() => void} [props.onAction]   Makes the circular arrow a button.
 * @param {string} [props.actionLabel]    Accessible name for that button.
 * @param {string} [props.className]
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition,
  firstName,
  lastName,
  imageUrl,
  description,
  onAction,
  actionLabel,
  className,
}) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return (
    <article className={['tmc', position === 'right' && 'tmc--right', className].filter(Boolean).join(' ')}>
      <p className="tmc-role" data-aos="fade-up">
        {jobPosition}
      </p>

      <div className="tmc-row">
        <div className="tmc-photo" data-aos="fade-up">
          <img src={imageUrl} alt={fullName} loading="lazy" />
        </div>

        <div className="tmc-info" data-aos={position === 'right' ? 'fade-right' : 'fade-left'} data-aos-delay="150">
          <h3 className="tmc-name">
            {firstName}
            <br />
            <span>{lastName}</span>
          </h3>

          <div className="tmc-details">
            {onAction && (
              <button type="button" className="tmc-cta" onClick={onAction} aria-label={actionLabel ?? `More about ${fullName}`}>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            )}
            {description && <p className="tmc-bio">{description}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
