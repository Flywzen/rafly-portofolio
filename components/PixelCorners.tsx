/**
 * Four corner pixels that fade in on hover of the parent, mimicking a
 * retro-game selection cursor/reticle. Parent element needs `group
 * relative` in its className for this to work (group for the hover
 * trigger, relative for the absolute positioning to anchor correctly).
 *
 * This is the one deliberate use of the yellow accent for a hover signal —
 * not decoration sprinkled everywhere, a single consistent "this is
 * interactive / this is now focused" cue.
 */
export default function PixelCorners() {
  const corner = 'absolute w-2 h-2 bg-pixel-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none'

  return (
    <>
      <span aria-hidden="true" className={`${corner} -top-[3px] -left-[3px]`} />
      <span aria-hidden="true" className={`${corner} -top-[3px] -right-[3px]`} />
      <span aria-hidden="true" className={`${corner} -bottom-[3px] -left-[3px]`} />
      <span aria-hidden="true" className={`${corner} -bottom-[3px] -right-[3px]`} />
    </>
  )
}
