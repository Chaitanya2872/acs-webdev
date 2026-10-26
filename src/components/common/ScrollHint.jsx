import useScrollY from '../../hooks/useScrollY';

// Bouncing "scroll down" chevron for long service pages; fades out once the reader starts scrolling.
export default function ScrollHint() {
  const scrollY = useScrollY();

  return (
    <div className={`acs-scroll-hint${scrollY > 200 ? ' acs-hint-hidden' : ''}`} aria-hidden="true">
      <div className="acs-scroll-hint-inner">
        <i className="bi bi-chevron-double-down" />
      </div>
    </div>
  );
}
