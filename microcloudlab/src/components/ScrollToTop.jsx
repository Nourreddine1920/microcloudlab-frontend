import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * @module ScrollToTop
 */

/**
 * A component that scrolls the window to the top (0, 0) whenever the route changes.
 * This is useful for ensuring that the user sees the top of the new page after navigation.
 *
 * @returns {null} This component does not render anything.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;