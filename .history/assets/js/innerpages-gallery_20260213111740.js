document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("galleryTrack");
  const viewport = document.querySelector(".aman-gallery-viewport");
  const items = document.querySelectorAll(".gallery-item");
  const sliderTrack = document.getElementById("sliderTrack");
  const indicator = document.getElementById("sliderIndicator");

  let currentIndex = 0;
  const total = items.length;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  /* =========================================
     MAIN MOVEMENT FUNCTION
  ========================================= */
  function goTo(index) {

    if (index < 0) index = 0;
    if (index > total - 1) index = total - 1;

    items.forEach(item => item.classList.remove("active"));
    items[index].classList.add("active");

    const item = items[index];
    const viewportWidth = viewport.offsetWidth;

    const offset =
      item.offsetLeft - (viewportWidth / 2) + (item.offsetWidth / 2);

    track.style.transition =
      "transform 1.4s cubic-bezier(0.16,1,0.3,1)";

    track.style.transform = `translateX(-${offset}px)`;

    prevTranslate = -offset;
    currentIndex = index;

    // Slider indicator
    if (sliderTrack && indicator) {
      const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
      const progress = index / (total - 1);
      indicator.style.transition =
        "left 1.4s cubic-bezier(0.16,1,0.3,1)";
      indicator.style.left = `${progress * maxX}px`;
    }
  }

  /* =========================================
     EDGE CURSOR DETECTION
  ========================================= */
  viewport.addEventListener("mousemove", (e) => {

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const center = rect.width / 2;

    viewport.classList.remove("edge-left", "edge-right");

    if (x < center) {
      viewport.classList.add("edge-left");
    } else {
      viewport.classList.add("edge-right");
    }

  });

  /* =========================================
     CLICK NAVIGATION
  ========================================= */
  viewport.addEventListener("click", (e) => {

    if (isDragging) return;

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const center = rect.width / 2;

    if (x < center && currentIndex > 0) {
      goTo(currentIndex - 1);
    }
    else if (x >= center && currentIndex < total - 1) {
      goTo(currentIndex + 1);
    }

  });

  /* =========================================
     DRAG SUPPORT
  ========================================= */
  viewport.addEventListener("mousedown", (e) => {
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

    const moved = e.clientX - startX;

    if (moved < -100 && currentIndex < total - 1) {
      goTo(currentIndex + 1);
    }
    else if (moved > 100 && currentIndex > 0) {
      goTo(currentIndex - 1);
    }
    else {
      goTo(currentIndex);
    }
  });

  /* =========================================
     SLIDER BAR CLICK
  ========================================= */
  if (sliderTrack) {
    sliderTrack.addEventListener("click", (e) => {

      const rect = sliderTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const percent = clickX / sliderTrack.offsetWidth;
      const index = Math.round(percent * (total - 1));

      goTo(index);
    });
  }

  /* =========================================
     RESIZE FIX
  ========================================= */
  window.addEventListener("resize", () => {
    goTo(currentIndex);
  });

  /* INIT */
  goTo(0);

});
