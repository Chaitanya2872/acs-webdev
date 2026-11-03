import '../../styles/grid-background.css';

const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * A white backdrop ruled with a faint 6rem × 4rem grid and a soft light-blue glow (ported from a
 * Tailwind snippet to plain CSS). It fills its positioned parent, behind the content; pass `fixed` to
 * pin it to the screen instead, as the site-wide background. The glow sits top-centre by default, or
 * off the top-right corner with `glow="corner"`.
 *
 * @param {{ fixed?: boolean, glow?: 'top' | 'corner', className?: string }} props
 */
export default function GridBackground({ fixed = false, glow = 'top', className }) {
  return (
    <div
      className={cx('grid-bg', fixed && 'grid-bg--fixed', glow === 'corner' && 'grid-bg--corner', className)}
      aria-hidden="true"
    >
      <div className="grid-bg-glow" />
    </div>
  );
}
