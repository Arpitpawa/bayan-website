const track = document.getElementById("galleryTrack");
const sliderTrack = document.getElementById("sliderTrack");
const indicator = document.getElementById("sliderIndicator");
const viewport = document.querySelector(".aman-gallery-viewport");

const totalItems = document.querySelectorAll(".gallery-item").length;
let currentIndex = 0;

function updateGallery(index) {
  const maxTranslate = track.scrollWidth - viewport.offsetWidth;
  const progress = index / (totalItems - 1);

  // Fade out first
  track.style.opacity = "0.4";
  track.style.transform = "scale(0.98)";

  setTimeout(() => {
    track.style.transform =
      `translateX(-${progress * maxTranslate}px) scale(1)`;

    track.style.opacity = "1";

    const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
    indicator.style.left = `${progress * maxX}px`;

  }, 200);

  currentIndex = index;
}


sliderTrack.addEventListener("click", (e) => {
  const rect = sliderTrack.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  const percent = clickX / sliderTrack.offsetWidth;
  const index = Math.round(percent * (totalItems - 1));

  updateGallery(index);
});
document.getElementById("nextArrow").addEventListener("click", () => {
  if (currentIndex < totalItems - 1) {
    updateGallery(currentIndex + 1);
  }
});

document.getElementById("prevArrow").addEventListener("click", () => {
  if (currentIndex > 0) {
    updateGallery(currentIndex - 1);
  }
});
