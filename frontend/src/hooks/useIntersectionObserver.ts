import { useState, useEffect, type RefObject } from "react";

/**
 * Returns true when the target element intersects the viewport.
 * Useful for triggering animations on scroll.
 *
 * @param ref - React ref pointing to the target DOM element
 * @param options - IntersectionObserver options (threshold, rootMargin, etc.)
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
 */
export const useIntersectionObserver = (
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isIntersecting;
};
