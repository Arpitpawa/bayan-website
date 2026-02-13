// ===========================================
// AMAN STYLE CENTERED GALLERY
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("galleryTrack");
  const viewport = document.querySelector(".aman-gallery-viewport");
  const items = document.querySelectorAll(".gallery-item");

  const sliderTrack = document.getElementById("sliderTrack");
  const indicator = document.getElementById("sliderIndicator");

  const prevBtn = document.getElementById("prevArrow");
  const nextBtn = document.getElementById("nextArrow");

  if (!track || !viewport || items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;

  // ===========================================
  // CENTER ACTIVE IMAGE
  // ===========================================
  function updateGallery(index) {

    if (index < 0) index = 0;
    if (index > totalItems - 1) index = totalItems - 1;

    items.forEach(item => item.classList.remove("active"));
    items[index].classList.add("active");

    const item = items[index];

    const viewportWidth = viewport.offsetWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;

    const centerOffset =
      itemLeft - (viewportWidth / 2) + (itemWidth / 2);

    track.style.transition =
      "transform 1.4s cubic-bezier(0.16,1,0.3,1)";

    track.style.transform =
      `translateX(-${centerOffset}px)`;

    // Move slider indicator
    if (sliderTrack && indicator) {
      const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
      const progress = index / (totalItems - 1);

      indicator.style.transition =
        "left 1.4s cubic-bezier(0.16,1,0.3,1)";

      indicator.style.left = `${progress * maxX}px`;
    }

    currentIndex = index;
  }

  // ===========================================
  // ARROWS
  // ===========================================
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        updateGallery(currentIndex + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        updateGallery(currentIndex - 1);
      }
    });
  }

  // ===========================================
  // SLIDER CLICK
  // ===========================================
  if (sliderTrack) {
    sliderTrack.addEventListener("click", (e) => {
      const rect = sliderTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const percent = clickX / sliderTrack.offsetWidth;
      const index = Math.round(percent * (totalItems - 1));

      updateGallery(index);
    });
  }

  // ===========================================
  // WINDOW RESIZE FIX
  // ===========================================
  window.addEventListener("resize", () => {
    updateGallery(currentIndex);
  });

  // ===========================================
  // INIT
  // ===========================================
  updateGallery(0);

});
