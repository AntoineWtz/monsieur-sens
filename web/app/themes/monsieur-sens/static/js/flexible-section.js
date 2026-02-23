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
    document.querySelectorAll('[data-faq-group]').forEach(function (group) {
      const opened = Array.from(group.querySelectorAll('details[open]'));
      if (opened.length > 1) {
        opened.slice(1).forEach(d => d.open = false);
      } else if (opened.length === 0) {
        const first = group.querySelector('details');
        if (first) first.open = true;
      }

      group.querySelectorAll('details').forEach(function (detail) {
        detail.addEventListener('toggle', function () {
          if (detail.open) {
            group.querySelectorAll('details').forEach(function (other) {
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
