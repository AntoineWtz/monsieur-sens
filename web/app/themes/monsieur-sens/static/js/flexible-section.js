// Video Modal (YouTube, Vimeo, MP4, WebM, OGG)
export function VideoModal() {
  const modal = document.getElementById("cw-video-modal");
  if (!modal) return;

  const slot = modal.querySelector(".cw-video-slot");
  const body = document.body;
  const openers = document.querySelectorAll(".cw-video-open");
  const closes = modal.querySelectorAll(".cw-backdrop, .cw-close");

  function isYouTube(u) {
    return /youtu\.?be/.test(u);
  }
  function isVimeo(u) {
    return /vimeo\.com/.test(u);
  }
  function isFile(u) {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(u);
  }

  function ytId(u) {
    try {
      if (u.includes("youtu.be/"))
        return u.split("youtu.be/")[1].split(/[?&]/)[0];
      const url = new URL(u);
      return url.searchParams.get("v") || "";
    } catch {
      return "";
    }
  }
  function vmId(u) {
    try {
      return u.split("vimeo.com/")[1].split(/[?&]/)[0];
    } catch {
      return "";
    }
  }

  function buildEmbed(url) {
    slot.innerHTML = "";

    if (isYouTube(url)) {
      const id = ytId(url);
      const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
      const ifr = document.createElement("iframe");
      ifr.src = src;
      ifr.allow = "autoplay; encrypted-media; picture-in-picture";
      ifr.allowFullscreen = true;
      ifr.className = "w-full h-full";
      slot.appendChild(ifr);
      return;
    }

    if (isVimeo(url)) {
      const id = vmId(url);
      const src = `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;
      const ifr = document.createElement("iframe");
      ifr.src = src;
      ifr.allow = "autoplay; encrypted-media; picture-in-picture";
      ifr.allowFullscreen = true;
      ifr.className = "w-full h-full";
      slot.appendChild(ifr);
      return;
    }

    if (isFile(url)) {
      const vid = document.createElement("video");
      vid.src = url;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.className = "w-full h-full object-contain bg-black";
      slot.appendChild(vid);
      return;
    }

    window.open(url, "_blank");
  }

  function open(url) {
    buildEmbed(url);
    modal.classList.remove("hidden");
    body.classList.add("overflow-hidden");
  }
  function close() {
    modal.classList.add("hidden");
    body.classList.remove("overflow-hidden");
    slot.innerHTML = "";
  }

  openers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-video-url");
      if (url) open(url.trim());
    });
  });
  closes.forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// FAQ: only one <details> open per group and ensure first is open by default
export function FaqGroups() {
  try {
    document.querySelectorAll("[data-faq-group]").forEach(function (group) {
      const opened = Array.from(group.querySelectorAll("details[open]"));
      if (opened.length > 1) {
        opened.slice(1).forEach((d) => (d.open = false));
      } else if (opened.length === 0) {
        const first = group.querySelector("details");
        if (first) first.open = true;
      }

      group.querySelectorAll("details").forEach(function (detail) {
        detail.addEventListener("toggle", function () {
          if (detail.open) {
            group.querySelectorAll("details").forEach(function (other) {
              if (other !== detail) other.open = false;
            });
          }
        });
      });
    });
  } catch (e) {
    // fail silently if DOM structure not present
  }
}

// Masonry grid: calculate row spans and handle expansion
export function MasonryGrid() {
  try {
    const grids = document.querySelectorAll("[data-masonry] .ms-grid");
    if (!grids.length) return;

    const debounce = (fn, wait = 120) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };

    function resizeGrid(grid) {
      const style = window.getComputedStyle(grid);
      const rowHeight = parseInt(style.getPropertyValue("grid-auto-rows")) || 8;
      const gap =
        parseInt(style.getPropertyValue("gap")) ||
        parseInt(style.getPropertyValue("grid-row-gap")) ||
        0;

      grid.querySelectorAll(".masonry-item").forEach((item) => {
        // measure content height
        const content = item.querySelector(".masonry-content") || item;
        const height = content.getBoundingClientRect().height;
        const span = Math.ceil((height + gap) / (rowHeight + gap));
        item.style.gridRowEnd = "span " + span;
      });
    }

    function initGrid(grid) {
      // recalc on each image load
      const imgs = Array.from(grid.querySelectorAll("img"));
      let loaded = 0;
      if (!imgs.length) {
        resizeGrid(grid);
      }
      imgs.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            resizeGrid(grid);
          });
        }
      });
      // initial calc
      setTimeout(() => resizeGrid(grid), 50);

      // click to expand / collapse — allow up to 2 expanded items (FIFO)
      (function () {
        let expandedOrder = [];

        // initialize array from any pre-expanded items
        grid.querySelectorAll(".masonry-item.is-expanded").forEach((it) => {
          expandedOrder.push(it);
        });

        grid.addEventListener("click", (e) => {
          const item = e.target.closest(".masonry-item");
          if (!item) return;

          const isNowExpanded = item.classList.contains("is-expanded");

          if (isNowExpanded) {
            // If already expanded, collapse it
            // If nothing pre-expanded, pick two random items to expand by default
            if (expandedOrder.length === 0) {
              const items = Array.from(grid.querySelectorAll(".masonry-item"));
              if (items.length >= 2) {
                // pick two distinct random indices
                const idx1 = Math.floor(Math.random() * items.length);
                let idx2 = Math.floor(Math.random() * items.length);
                while (idx2 === idx1) {
                  idx2 = Math.floor(Math.random() * items.length);
                }
                const first = items[idx1];
                const second = items[idx2];
                first.classList.add("is-expanded");
                second.classList.add("is-expanded");
                expandedOrder.push(first, second);
              } else if (items.length === 1) {
                const only = items[0];
                only.classList.add("is-expanded");
                expandedOrder.push(only);
              }
            }
            item.classList.remove("is-expanded");
            expandedOrder = expandedOrder.filter((x) => x !== item);
          } else {
            // Expand item
            item.classList.add("is-expanded");
            expandedOrder.push(item);

            // If more than two, collapse the oldest one
            if (expandedOrder.length > 2) {
              const first = expandedOrder.shift();
              if (first && first !== item) {
                first.classList.remove("is-expanded");
              }
            }
          }

          // Ensure layout recalculation after visual changes
          requestAnimationFrame(() => resizeGrid(grid));
          setTimeout(() => resizeGrid(grid), 220);
        });
      })();
    }

    const onResize = debounce(() => {
      grids.forEach((g) => resizeGrid(g));
    }, 160);

    grids.forEach((g) => initGrid(g));
    window.addEventListener("resize", onResize);
  } catch (e) {
    // fail silently
    // console.error('MasonryGrid error', e);
  }
}
