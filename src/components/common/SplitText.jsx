import { Fragment } from 'react';

// Renders text as individually masked words that slide up in sequence once an ancestor (or the element
// itself) gets .aos-animate from useReveal. `start` offsets the stagger so several runs can chain.
export default function SplitText({ text, start = 0 }) {
  return text.split(' ').map((word, i) => (
    // Words are positional and never reorder, so the index is a stable key here. The space sits outside
    // the inline-block mask, otherwise it collapses and the words run together.
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="split-w">
        <span style={{ '--w': start + i }}>{word}</span>
      </span>
    </Fragment>
  ));
}
