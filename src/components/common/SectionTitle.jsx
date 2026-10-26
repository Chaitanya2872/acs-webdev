// Two-tone section heading, e.g. "Our" + bold "Services", with an optional small caption above.
export default function SectionTitle({ caption, lead, emphasis }) {
  return (
    <div className="container section-title" data-aos="fade-up">
      {caption && <h2>{caption}</h2>}
      <p>
        <span>{lead}</span> <span className="description-title">{emphasis}</span>
      </p>
    </div>
  );
}
