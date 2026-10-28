import SplitText from '../common/SplitText';

// Section heading in the gallery style: a bold title followed inline by a muted description,
// with optional content (chips, links) aligned to the right. Words rise in as it scrolls into view.
export default function HomeHeading({ title, text, children }) {
  const titleWords = title.split(' ').length;

  return (
    <div className="lp-head" data-aos="split">
      <h2>
        <SplitText text={title} />{' '}
        {text && (
          <span className="lp-head-text">
            <SplitText text={text} start={titleWords} />
          </span>
        )}
      </h2>
      {children && <div className="lp-head-aside">{children}</div>}
    </div>
  );
}
