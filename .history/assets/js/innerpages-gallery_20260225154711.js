document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("galleryTrack");
  const viewport = document.querySelector(".aman-gallery-viewport");
  const sliderTrack = document.getElementById("sliderTrack");
  const indicator = document.getElementById("sliderIndicator");

  const originalItems = Array.from(document.querySelectorAll(".gallery-item"));
  const total = originalItems.length;

  const CLONE_COUNT = 2; // how many to clone on each side

  /* =========================
     CLONE ONLY EDGE ITEMS
  ========================== */

  const beforeClones = originalItems.slice(-CLONE_COUNT).map(item => item.cloneNode(true));
  const afterClones = originalItems.slice(0, CLONE_COUNT).map(item => item.cloneNode(true));

  beforeClones.forEach(clone => track.prepend(clone));
  afterClones.forEach(clone => track.append(clone));

  const allItems = Array.from(document.querySelectorAll(".gallery-item"));

  let currentIndex = CLONE_COUNT;
  let isDragging = false;
  let startX = 0;
  let prevTranslate = 0;

  /* =========================
     MAIN POSITION FUNCTION
  ========================== */

  function goTo(index, smooth = true) {

    const item = allItems[index];
    const viewportWidth = viewport.offsetWidth;

    const offset =
      item.offsetLeft - (viewportWidth / 2) + (item.offsetWidth / 2);

    if (!smooth) {
      track.style.transition = "none";
    } else {
      track.style.transition =
        "transform 1.2s cubic-bezier(0.16,1,0.3,1)";
    }

    track.style.transform = `translateX(-${offset}px)`;
    prevTranslate = -offset;
    currentIndex = index;

    updateActive();
    updateSlider();
  }

  /* =========================
     ACTIVE CENTER IMAGE
  ========================== */

  function updateActive() {

    allItems.forEach(item => item.classList.remove("active"));
    allItems[currentIndex].classList.add("active");

  }

  /* =========================
     SLIDER UPDATE
  ========================== */

  function updateSlider() {

    if (!sliderTrack || !indicator) return;

    let realIndex = (currentIndex - CLONE_COUNT) % total;
    if (realIndex < 0) realIndex += total;

    const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
    const progress = realIndex / (total - 1);

    indicator.style.left = `${progress * maxX}px`;
  }

  /* =========================
     LOOP FIX
  ========================== */

  function checkLoop() {

    if (currentIndex >= total + CLONE_COUNT) {
      currentIndex = CLONE_COUNT;
      goTo(currentIndex, false);
    }

    if (currentIndex < CLONE_COUNT) {
      currentIndex = total + CLONE_COUNT - 1;
      goTo(currentIndex, false);
    }
  }

  /* =========================
     NEXT / PREV
  ========================== */

  function next() {
    goTo(currentIndex + 1);
    setTimeout(checkLoop, 1200);
  }

  function prev() {
    goTo(currentIndex - 1);
    setTimeout(checkLoop, 1200);
  }

  /* =========================
     CLICK NAV
  ========================== */

  viewport.addEventListener("click", (e) => {

    if (isDragging) return;

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) prev();
    else next();

  });

  /* =========================
     CURSOR SIDE
  ========================== */

  viewport.addEventListener("mousemove", (e) => {

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;

    viewport.classList.remove("edge-left", "edge-right");

    if (x < rect.width / 2) viewport.classList.add("edge-left");
    else viewport.classList.add("edge-right");

  });

  /* =========================
     DRAG
  ========================== */

  viewport.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    const moveX = e.clientX - startX;
    track.style.transform =
      `translateX(${prevTranslate + moveX}px)`;

  });

  window.addEventListener("mouseup", (e) => {

    if (!isDragging) return;
    isDragging = false;

    const moved = e.clientX - startX;

    if (moved < -80) next();
    else if (moved > 80) prev();
    else goTo(currentIndex);

  });

  /* =========================
     SLIDER CLICK
  ========================== */

  if (sliderTrack) {
    sliderTrack.addEventListener("click", (e) => {

      const rect = sliderTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const percent = clickX / sliderTrack.offsetWidth;
      const target = Math.round(percent * (total - 1));

      goTo(target + CLONE_COUNT);

    });
  }

  /* INIT */
  goTo(currentIndex, false);

});
document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("discoverTrack");
  const slides = document.querySelectorAll(".discover-slide");

  let index = 0;

  function moveSlider() {
    index++;
    if (index > slides.length - 3) index = 0;

    const slideWidth = slides[0].offsetWidth + 40;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  setInterval(moveSlider, 4000);

});