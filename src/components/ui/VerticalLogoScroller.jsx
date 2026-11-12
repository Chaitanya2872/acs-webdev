import '../../styles/vertical-logo-scroller.css';

/* Ported from the shadcn "vertical-logo-scroller" component to this project's stack (plain React + CSS,
 * no Tailwind/TypeScript). One column of names or logos scrolling endlessly up or down: the list is
 * rendered twice and the track slides by exactly half its height, so the loop has no seam. The column
 * fades out at both ends and pauses while hovered or focused.
 */

/**
 * @param {object} props
 * @param {React.ReactNode[]} props.logos  Names or logo elements, top to bottom.
 * @param {string} [props.speed='40s']      Time for one full loop.
 * @param {'up'|'down'} [props.direction='up']
 * @param {string} [props.className]
 */
export default function VerticalLogoScroller({ logos, speed = '40s', direction = 'up', className }) {
  if (!logos || logos.length === 0) return null;

  return (
    <div className={['vls', className].filter(Boolean).join(' ')}>
      <div
        className={`vls-track${direction === 'down' ? ' vls-track--down' : ''}`}
        style={{ '--scroll-duration': speed }}
      >
        <div className="vls-set">
          {logos.map((logo, index) => (
            <span key={index} className="vls-item">
              {logo}
            </span>
          ))}
        </div>
        <div className="vls-set" aria-hidden="true">
          {logos.map((logo, index) => (
            <span key={index} className="vls-item">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
