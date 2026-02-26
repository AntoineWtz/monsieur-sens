// Galerie: ouvre une modal avec l'image du plat (utilisé sur page-galerie)
export function GalleryModal() {
  try {
    const modal = document.getElementById("plat-image-modal");
    if (!modal) return;

    const img = modal.querySelector("#plat-image-modal__img");
    const caption = modal.querySelector("#plat-image-modal__caption");
    const backdrop = modal.querySelector("[data-modal-close]");

    function open(src, alt) {
      img.src = src || "";
      img.alt = alt || "";
      caption.textContent = alt || "";
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }

    function close() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
      img.src = "";
      img.alt = "";
      caption.textContent = "";
    }

    // openers: buttons with data-plat-img
    document.querySelectorAll("button[data-plat-img]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const src = btn.getAttribute("data-plat-img");
        const alt = btn.getAttribute("aria-label") || "";
        if (src) open(src, alt);
      });
    });

    // close listeners
    modal
      .querySelectorAll("[data-modal-close]")
      .forEach((el) => el.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
    });
  } catch (e) {
    // silent
  }
}
