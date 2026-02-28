// Galerie: expansion inline des images
export function GalleryInline() {
  try {
    let expanded = null;

    // cache collapsed heights for smoother transitions
    document.querySelectorAll(".plat-card img").forEach((img) => {
      try {
        const h = img.getBoundingClientRect().height;
        img.dataset.collapsedHeight = `${Math.round(h)}px`;
      } catch (e) {
        img.dataset.collapsedHeight = "";
      }
    });

    function collapseCard(card) {
      if (!card) return;
      const img = card.querySelector("img");
      card.classList.remove("expanded");
      // remove inline overrides
      if (img) {
        // animate back to collapsed height for smoothness
        const collapsed = img.dataset.collapsedHeight || "";
        if (collapsed) {
          // set current pixel height then animate to collapsed
          const cur = `${Math.round(img.getBoundingClientRect().height)}px`;
          img.style.maxHeight = cur;
          // force reflow
          // eslint-disable-next-line no-unused-expressions
          img.offsetHeight;
          img.style.transition = "max-height 620ms cubic-bezier(.2,.8,.2,1)";
          img.style.maxHeight = collapsed;
          // cleanup after transition
          img.addEventListener("transitionend", function _t() {
            img.style.maxHeight = "";
            img.style.height = "";
            img.style.width = "";
            img.style.transition = "";
            img.removeEventListener("transitionend", _t);
          });
        } else {
          img.style.maxHeight = "";
          img.style.height = "";
          img.style.width = "";
          img.style.transition = "";
        }
      }
      expanded = null;
    }

    function expandCard(card) {
      if (!card) return;
      const img = card.querySelector("img");
      // collapse previous
      if (expanded && expanded !== card) collapseCard(expanded);
      card.classList.add("expanded");
      if (img) {
        // animate from current height to target max-height for smooth expand
        const cur = `${Math.round(img.getBoundingClientRect().height)}px`;
        img.style.maxHeight = cur;
        img.style.width = "100%";
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        img.offsetHeight;
        img.style.transition = "max-height 620ms cubic-bezier(.2,.8,.2,1)";
        img.style.maxHeight = "80vh";
        img.style.height = "auto";
        // cleanup transition property after end
        img.addEventListener("transitionend", function _te() {
          img.style.transition = "";
          img.removeEventListener("transitionend", _te);
        });
      }
      expanded = card;
    }

    document.querySelectorAll("button[data-plat-img]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = btn.closest(".plat-card");
        if (!card) return;
        if (card.classList.contains("expanded")) {
          collapseCard(card);
        } else {
          expandCard(card);
          // scroll into view a bit to show expanded image on small screens
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && expanded) collapseCard(expanded);
    });

    // click outside an expanded card collapses it
    document.addEventListener("click", (e) => {
      if (!expanded) return;
      const isInside =
        e.target.closest && e.target.closest(".plat-card") === expanded;
      if (!isInside) collapseCard(expanded);
    });
  } catch (err) {
    // silent
  }
}
