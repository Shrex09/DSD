import { useState, useEffect } from "react";

/**
 * Returns a debounced version of the given value.
 * Useful for search inputs or any value that should not update on every keystroke.
 *
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
