import { useState, useEffect } from "react";

/**
 * Returns the current vertical scroll position in pixels.
 * Uses a passive event listener for performance.
 *
 * @example
 * const scrollY = useScrollPosition();
 * const isScrolled = scrollY > 50;
 */
export const useScrollPosition = (): number => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};
