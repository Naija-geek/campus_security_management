/**
 * A utility function for conditionally joining class names together.
 * Filters out falsy values from the inputs.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}