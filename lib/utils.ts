/**
 * Merge class names, filtering out falsy values.
 * Replaces clsx/cn to avoid an extra dependency.
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(' ')
}
