document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("galleryTrack");
  const viewport = document.querySelector(".aman-gallery-viewport");
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const sliderTrack = document.getElementById("sliderTrack");
  const indicator = document.getElementById("sliderIndicator");

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let prevTranslate = 0;

  const total = items.length;

  /* =========================================
     DUPLICATE FOR LOOP
  ========================================= */

  const cloneBefore = items.map(item => item.cloneNode(true));
  const cloneAfter = items.map(item => item.cloneNode(true));

  cloneBefore.forEach(clone => track.prepend(clone));
  cloneAfter.forEach(clone => track.append(clone));

  const allItems = document.querySelectorAll(".gallery-item");

  currentIndex = total; // Start in real center set

  /* =========================================
     POSITIONING FUNCTION
  ========================================= */

  function updatePosition(index, smooth = true) {

    const item = allItems[index];
    const viewportWidth = viewport.offsetWidth;

    const offset =
      item.offsetLeft - (viewportWidth / 2) + (item.offsetWidth / 2);

    if (!smooth) {
      track.style.transition = "none";
    } else {
      track.style.transition =
        "transform 1.4s cubic-bezier(0.16,1,0.3,1)";
    }

    track.style.transform = `translateX(-${offset}px)`;

    prevTranslate = -offset;
    currentIndex = index;

    updateSlider(index);
  }

  /* =========================================
     SLIDER UPDATE
  ========================================= */

  function updateSlider(index) {

    if (!sliderTrack || !indicator) return;

    let realIndex = index % total;
    if (realIndex < 0) realIndex += total;

    const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
    const progress = realIndex / (total - 1);

    indicator.style.left = `${progress * maxX}px`;
  }

  /* =========================================
     LOOP FIX
  ========================================= */

  function checkLoop() {

    if (currentIndex >= total * 2) {
      currentIndex = total;
      updatePosition(currentIndex, false);
    }

    if (currentIndex < total) {
      currentIndex = total * 2 - 1;
      updatePosition(currentIndex, false);
    }
  }

  /* =========================================
     NEXT / PREV
  ========================================= */

  function next() {
    currentIndex++;
    updatePosition(currentIndex);
    setTimeout(checkLoop, 1400);
  }

  function prev() {
    currentIndex--;
    updatePosition(currentIndex);
    setTimeout(checkLoop, 1400);
  }

  /* =========================================
     CLICK NAVIGATION
  ========================================= */

  viewport.addEventListener("click", (e) => {

    if (isDragging) return;

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      prev();
    } else {
      next();
    }
  });

  /* =========================================
     CURSOR SIDE DETECTION
  ========================================= */

  viewport.addEventListener("mousemove", (e) => {

    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;

    viewport.classList.remove("edge-left", "edge-right");

    if (x < rect.width / 2) {
      viewport.classList.add("edge-left");
    } else {
      viewport.classList.add("edge-right");
    }
  });

  /* =========================================
     DRAG
  ========================================= */

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

    if (moved < -100) next();
    else if (moved > 100) prev();
    else updatePosition(currentIndex);
  });

  /* =========================================
     SLIDER CLICK
  ========================================= */

  if (sliderTrack) {
    sliderTrack.addEventListener("click", (e) => {

      const rect = sliderTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const percent = clickX / sliderTrack.offsetWidth;
      const target = Math.round(percent * (total - 1));

      currentIndex = total + target;
      updatePosition(currentIndex);
    });
  }

  /* INIT */
  updatePosition(currentIndex, false);

});
