/**
 * Merges class name strings, filtering out falsy values.
 * Lightweight alternative to clsx for simple conditional class composition.
 *
 * @example
 * cn("base-class", isActive && "active", undefined)
 * // → "base-class active"
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
