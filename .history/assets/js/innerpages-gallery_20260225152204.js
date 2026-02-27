document.addEventListener("DOMContentLoaded", function () {

  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");
  const scrollbar = document.getElementById("galleryScrollbar");
  const progress = document.getElementById("galleryProgress");

  if (!track) return;

  let currentIndex = 0;
  const items = document.querySelectorAll(".gallery-item");
  const totalItems = items.length;

  function updateGallery() {
    const itemWidth = items[0].offsetWidth + 32; // width + gap
    const moveX = currentIndex * itemWidth;

    track.style.transform = `translateX(-${moveX}px)`;

    const percent = (currentIndex / (totalItems - 1)) * 100;
    progress.style.transform = `translateX(${percent}%)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      updateGallery();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  });

  /* ===== CLICK ON SCROLLBAR ===== */

  scrollbar.addEventListener("click", function (e) {
    const rect = scrollbar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;

    currentIndex = Math.round(percent * (totalItems - 1));
    updateGallery();
  });

});