/**
 * Detects whether a project's demo/GitHub URLs are real or still the
 * placeholder values from data/projects.ts. Used by both ProjectCard and
 * CaseStudySection to decide whether to render a live link or a disabled
 * "Demo Soon" state, previously copy-pasted in both files with no shared
 * source of truth for what "still a placeholder" means.
 *
 * Both checks are intentionally precise rather than loose substring
 * matches: a real GitHub username like "USERNAME123" or a real demo URL
 * that happens to contain "your-demo" somewhere should never be
 * misreported as a placeholder.
 */

/** The exact placeholder every project in data/projects.ts starts with. */
const DEMO_PLACEHOLDER = 'https://your-demo.vercel.app'

/** Matches "/USERNAME/" as a whole path segment, not a loose substring —
 *  so a real username containing "USERNAME" (e.g. "USERNAME123") doesn't
 *  false-positive. */
const GITHUB_PLACEHOLDER_SEGMENT = /\/USERNAME\//

export interface ProjectLinkStatus {
  demoReady: boolean
  githubReady: boolean
}

export function getProjectLinkStatus(project: {
  demoUrl: string
  githubUrl: string
}): ProjectLinkStatus {
  return {
    demoReady: project.demoUrl !== DEMO_PLACEHOLDER,
    githubReady: !GITHUB_PLACEHOLDER_SEGMENT.test(project.githubUrl),
  }
}
