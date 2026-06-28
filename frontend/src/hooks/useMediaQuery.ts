import { useState, useEffect } from "react";

/**
 * Returns true if the current viewport matches the given CSS media query.
 *
 * @param query - A valid CSS media query string, e.g. "(max-width: 768px)"
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};
