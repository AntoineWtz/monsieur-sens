// Suggestions: rotateur automatique d'une image par section (fade)
export function SuggestionsRotator() {
  try {
    const rotators = document.querySelectorAll(".suggestion-rotator");
    if (!rotators.length) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rotators.forEach((container) => {
      const imgs = Array.from(container.querySelectorAll(".rotator-image"));
      if (!imgs.length) return;

      let current = 0;
      const total = imgs.length;
      const interval =
        parseInt(container.getAttribute("data-interval")) || 3500;

      // ensure initial visibility and set sensible styles
      imgs.forEach((el, i) => {
        el.style.transition = reduceMotion
          ? "none"
          : "opacity 700ms ease, transform 700ms ease";
        el.style.position = "absolute";
        el.style.top = 0;
        el.style.left = 0;
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.objectFit = "cover";
        el.style.opacity = i === 0 ? "1" : "0";
        el.style.transform = i === 0 ? "scale(1)" : "scale(1.02)";
      });

      let timer = null;
      const startTimer = () => {
        if (reduceMotion) return;
        stopTimer();
        timer = setInterval(() => {
          const next = (current + 1) % total;
          imgs[current].style.opacity = "0";
          imgs[current].style.transform = "scale(1.02)";
          imgs[next].style.opacity = "1";
          imgs[next].style.transform = "scale(1)";
          current = next;
          const live = container.querySelector(".sr-live");
          if (live)
            live.textContent = imgs[current].getAttribute("data-title") || "";
        }, interval);
      };

      const stopTimer = () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };

      // create or ensure a polite live region for announcements
      if (!container.querySelector(".sr-live")) {
        const sr = document.createElement("div");
        sr.className = "sr-only sr-live";
        sr.setAttribute("aria-live", "polite");
        container.appendChild(sr);
      }

      // start rotation
      startTimer();

      // pause on hover/focus
      container.addEventListener("mouseenter", stopTimer);
      container.addEventListener("focusin", stopTimer);
      container.addEventListener("mouseleave", startTimer);
      container.addEventListener("focusout", startTimer);

      // no manual controls: carousel auto-rotates only; keyboard controls removed per design
    });
  } catch (e) {
    // silent
  }
}
