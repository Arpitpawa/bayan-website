const track = document.getElementById("galleryTrack");
const sliderTrack = document.getElementById("sliderTrack");
const indicator = document.getElementById("sliderIndicator");
const segments = sliderTrack.querySelectorAll(".aman-segment");
const viewport = document.querySelector(".aman-gallery-viewport");

let isDragging = false;
const total = segments.length;

/* ===============================
   MOVE GALLERY
================================ */
function moveGallery(index) {
  const maxTranslate = track.scrollWidth - viewport.offsetWidth;
  const progress = index / (total - 1);
  track.style.transform = `translateX(-${progress * maxTranslate}px)`;
}

/* ===============================
   MOVE INDICATOR
================================ */
function moveIndicator(index) {
  const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
  const step = maxX / (total - 1);
  indicator.style.left = `${step * index}px`;
}
segments.forEach((seg, index) => {
  seg.addEventListener("click", (e) => {
    e.stopPropagation();
    moveIndicator(index);
    moveGallery(index);
  });
});



/* ===============================
   DRAG
================================ */
sliderTrack.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.userSelect = "none";
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.userSelect = "";

  const rect = sliderTrack.getBoundingClientRect();
  let x = e.clientX - rect.left;

  const maxX = sliderTrack.offsetWidth - indicator.offsetWidth;
  x = Math.max(0, Math.min(x, maxX));

  const index = Math.round(x / (maxX / (total - 1)));
  moveIndicator(index);
  moveGallery(index);
});
