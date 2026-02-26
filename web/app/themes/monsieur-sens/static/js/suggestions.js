// Suggestions: rotateur automatique d'une image par section (fade)
export function SuggestionsRotator() {
  try {
    const rotators = document.querySelectorAll(".suggestion-rotator");
    if (!rotators.length) return;

    rotators.forEach((container) => {
      const imgs = Array.from(container.querySelectorAll(".rotator-image"));
      if (!imgs.length) return;

      let current = 0;
      const total = imgs.length;
      const interval =
        parseInt(container.getAttribute("data-interval")) || 3500;

      // ensure initial visibility
      imgs.forEach((el, i) => {
        el.style.transition = "opacity 700ms ease";
        el.style.position = "absolute";
        el.style.top = 0;
        el.style.left = 0;
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.objectFit = "cover";
        el.style.opacity = i === 0 ? "1" : "0";
      });

      let timer = setInterval(() => {
        const next = (current + 1) % total;
        imgs[current].style.opacity = "0";
        imgs[next].style.opacity = "1";
        current = next;
      }, interval);

      // pause on hover/focus
      container.addEventListener("mouseenter", () => clearInterval(timer));
      container.addEventListener("focusin", () => clearInterval(timer));
      container.addEventListener("mouseleave", () => {
        timer = setInterval(() => {
          const next = (current + 1) % total;
          imgs[current].style.opacity = "0";
          imgs[next].style.opacity = "1";
          current = next;
        }, interval);
      });
    });
  } catch (e) {
    // silent
  }
}
