/**
 * "How I Think" — deliberately not a bullet list of principles. An
 * earlier version of this section was exactly that: four claims, each
 * with a supporting example underneath, which is a recognizable format
 * in its own right (the "engineering values" grid every portfolio has).
 * Same evidence, rewritten as connected paragraphs instead, because the
 * problem was never the claims, it was the form. A list of principles
 * reads as a mission statement. A few paragraphs read as someone actually
 * talking about their work.
 *
 * No scroll-reveal here either, on the same reasoning: this is a single
 * block of reflection, not a set of parallel items, so a fade-on-scroll
 * would be decoration standing in for content rather than motion that
 * communicates anything.
 */
export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="section-pad"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">

          <h2
            id="philosophy-heading"
            className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-8"
          >
            How I think.
          </h2>

          <div className="space-y-5 text-paper/60 text-lg leading-relaxed">
            <p>
              Most of what I would call my engineering approach shows up as things I
              did not build. Kiroku&apos;s roadmap dropped a comment wall and photo
              uploads, not because they were hard, but because neither made the core
              problem easier. The small business landing page never got the carousel
              the client first asked for, for the same reason.
            </p>
            <p>
              The same instinct shows up in dependencies. Kiroku does not use Redux,
              because a single-user local app does not have the cross-component
              coordination problem Redux exists to solve. This site&apos;s own
              class-merging helper is nine lines, not a package, because nine lines
              did not need one.
            </p>
            <p>
              It shows up again in who has to maintain the code once I am not around
              to explain it. The village site&apos;s content lives in one typed file
              instead of a CMS, because the staff running it after I left had no
              development background. Simple to hand off beat impressive to build.
            </p>
            <p>
              If a project&apos;s case study only lists what got built and not what
              got given up, that is a sign the decision was not examined for long
              enough. Trade-offs are the actual content of a technical decision, not a
              footnote to it, which is why every project below has a section for them.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
