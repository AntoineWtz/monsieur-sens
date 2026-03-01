// Simple fade slideshow for hero to avoid clipping/rounding issues between slides
export function HeroSwiper() {
  const el = document.querySelector(".hero-swiper");
  if (!el) return;

  const wrapper = el.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
  if (!slides.length) return;
  if (slides.length === 1) return; // nothing to do

  // Ensure container has rounded corners and hides overflow so images keep rounded edges
  el.classList.add('overflow-hidden', 'rounded-3xl');
  wrapper.style.position = 'relative';
  // keep a min height so absolutely positioned slides inherit visible area
  wrapper.style.minHeight = '60vh';

  slides.forEach((s, i) => {
    s.style.position = 'absolute';
    s.style.inset = '0';
    s.style.width = '100%';
    // do not force slide height to 100% (can collapse); let image define height
    s.style.transition = 'opacity 0.8s ease';
    s.style.opacity = i === 0 ? '1' : '0';
    s.style.zIndex = i === 0 ? '2' : '1';
    // keep pointer events off for slides so overlay buttons remain clickable
    s.style.pointerEvents = 'none';
    // ensure images fill area
    const img = s.querySelector('img');
    if (img) {
      img.style.width = '100%';
      // keep hero height at 60vh like the Twig template
      img.style.height = '60vh';
      img.style.objectFit = 'cover';
      // preserve existing rounding on img (CSS classes)
    }
  });

  let idx = 0;
  const delay = 4000;
  setInterval(() => {
    const next = (idx + 1) % slides.length;
    slides[idx].style.opacity = '0';
    slides[idx].style.zIndex = '1';
    slides[next].style.opacity = '1';
    slides[next].style.zIndex = '2';
    idx = next;
  }, delay);
}
