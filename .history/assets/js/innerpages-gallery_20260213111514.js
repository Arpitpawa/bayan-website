document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("galleryTrack");
  const viewport = document.querySelector(".aman-gallery-viewport");
  const items = document.querySelectorAll(".gallery-item");
  const sliderTrack = document.getElementById("sliderTrack");
  const indicator = document.getElementById("sliderIndicator");

  const cursorZone = document.getElementById("cursorZone");
  const cursorIndicator = document.getElementById("cursorIndicator");

  let currentIndex = 0;
  const totalItems = items.length;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // ===========================================
  // CENTER LOGIC
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
    track.style.transform = `translateX(-${centerOffset}px)`;

    currentIndex = index;
    prevTranslate = -centerOffset;

    if (sliderTrack && indicator) {
      const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
      const progress = index / (totalItems - 1);
      indicator.style.left = `${progress * maxX}px`;
    }
  }
// ===========================================
// SIX SENSES STYLE EDGE DETECTION
// ===========================================

viewport.addEventListener("mousemove", (e) => {

  const rect = viewport.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const center = rect.width / 2;

  viewport.classList.remove("edge-left", "edge-right");

  // If cursor is on left half
  if (x < center) {
    viewport.classList.add("edge-left");
  }

  // If cursor is on right half
  else {
    viewport.classList.add("edge-right");
  }

});


  // ===========================================
  // CLICK SIDE NAVIGATION
  // ===========================================
 viewport.addEventListener("click", (e) => {

  const rect = viewport.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const center = rect.width / 2;

  if (x < center && currentIndex > 0) {
    updateGallery(currentIndex - 1);
  }

  else if (x >= center && currentIndex < totalItems - 1) {
    updateGallery(currentIndex + 1);
  }

});




  // ===========================================
  // DRAG SUPPORT
  // ===========================================
  cursorZone.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const moveX = e.clientX - startX;
    currentTranslate = prevTranslate + moveX;

    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = e.clientX - startX;

    if (movedBy < -100 && currentIndex < totalItems - 1) {
      currentIndex++;
    }

    if (movedBy > 100 && currentIndex > 0) {
      currentIndex--;
    }

    updateGallery(currentIndex);
  });

  window.addEventListener("resize", () => {
    updateGallery(currentIndex);
  });

  updateGallery(0);

});
