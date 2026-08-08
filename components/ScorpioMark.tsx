/**
 * ScorpioMark — the one place the personal-zodiac idea survived.
 *
 * Everywhere else in this system is either fully generic (BackgroundSystem)
 * or personal-but-abstract (SignatureSpiral, tied to a trait rather than
 * an icon). This is the one literal, recognizable personal detail — kept
 * small, static, and tucked into the footer brand mark, next to "RF."
 * No animation: at this size, motion would read as a glitch, not a signal.
 * It brightens slightly on hover as the only acknowledgment that it's
 * there to be found, not announced.
 */
export default function ScorpioMark() {
  return (
    <svg
      viewBox="0 0 100 90"
      className="w-6 h-6 shrink-0 text-paper/35 hover:text-paper transition-colors duration-300"
      aria-hidden="true"
    >
      <title>Scorpio</title>
      <path
        d="M6,6 L16.4,13.8 L22.8,24.1 L34.5,29.3 L47.4,34.5 L62.9,39.6 L78.5,46.1 L90.1,57.8 L94,70.7 L87.5,81.1 L77.2,83.6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M16.4,13.8 L26.7,8.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <g fill="currentColor">
        <rect x="4.5" y="4.5" width="3" height="3" />
        <rect x="14.9" y="12.3" width="3" height="3" />
        <rect x="25.2" y="7.1" width="3" height="3" />
        <rect x="21.3" y="22.6" width="3" height="3" />
        <rect x="33" y="27.8" width="3" height="3" />
        <rect x="45.9" y="33" width="3" height="3" />
        <rect x="61.4" y="38.1" width="3" height="3" />
        <rect x="77" y="44.6" width="3" height="3" />
        <rect x="88.6" y="56.3" width="3" height="3" />
        <rect x="92.5" y="69.2" width="3" height="3" />
        <rect x="86" y="79.6" width="3" height="3" />
        <rect x="75.7" y="82.1" width="3" height="3" />
      </g>
    </svg>
  )
}
