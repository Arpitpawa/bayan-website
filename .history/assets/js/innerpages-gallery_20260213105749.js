const items = document.querySelectorAll(".gallery-item");
const track = document.getElementById("galleryTrack");
const viewport = document.querySelector(".aman-gallery-viewport");

let currentIndex = 0;

function updateGallery(index) {

  items.forEach(item => item.classList.remove("active"));
  items[index].classList.add("active");

  const item = items[index];
  const viewportWidth = viewport.offsetWidth;

  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;

  const centerOffset =
    itemLeft - (viewportWidth / 2) + (itemWidth / 2);

  track.style.transform =
    `translateX(-${centerOffset}px)`;

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

