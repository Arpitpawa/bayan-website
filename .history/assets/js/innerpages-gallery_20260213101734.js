const track = document.getElementById("galleryTrack");
const sliderTrack = document.getElementById("sliderTrack");
const indicator = document.getElementById("sliderIndicator");
const viewport = document.querySelector(".aman-gallery-viewport");

const totalItems = document.querySelectorAll(".gallery-item").length;
let currentIndex = 0;

function updateGallery(index) {
  const maxTranslate = track.scrollWidth - viewport.offsetWidth;
  const progress = index / (totalItems - 1);

  track.style.transform = `translateX(-${progress * maxTranslate}px)`;

  const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
  indicator.style.left = `${progress * maxX}px`;

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
