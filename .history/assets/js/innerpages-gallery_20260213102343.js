const track = document.getElementById("galleryTrack");
const sliderTrack = document.getElementById("sliderTrack");
const indicator = document.getElementById("sliderIndicator");
const viewport = document.querySelector(".aman-gallery-viewport");

const totalItems = document.querySelectorAll(".gallery-item").length;
let currentIndex = 0;

function updateGallery(index) {

  const maxTranslate = track.scrollWidth - viewport.offsetWidth;
  const progress = index / (totalItems - 1);
  const target = progress * maxTranslate;

  track.style.transition =
    "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)";

  track.style.transform = `translateX(-${target}px)`;

  const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
  indicator.style.transition =
    "left 1.4s cubic-bezier(0.16, 1, 0.3, 1)";

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

