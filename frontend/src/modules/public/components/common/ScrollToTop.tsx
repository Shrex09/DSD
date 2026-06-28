import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to (0, 0) on every route change.
 * Must be rendered inside a Router context.
 * Returns null — renders nothing in the DOM.
 */
const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
