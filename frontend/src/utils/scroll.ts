/**
 * Scrolls the window to the top, with smooth behaviour.
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Scrolls smoothly to the element with the given id.
 * Silently no-ops if the element is not found.
 *
 * @param id - The id of the target DOM element (without '#')
 */
export const scrollToElement = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
