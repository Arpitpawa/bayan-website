const track = document.getElementById("nearbyTrack");
const slider = document.getElementById("nearbySlider");
const indicator = document.getElementById("nearbyIndicator");
const segments = slider.querySelectorAll(".slider-segment");

const total = segments.length;

/* MOVE */
function goTo(index) {
  const containerWidth = track.parentElement.offsetWidth;
  const itemWidth = track.children[0].offsetWidth + 80;

  track.style.transform = `translateX(-${index * itemWidth}px)`;

  const maxX = slider.offsetWidth - indicator.offsetWidth;
  indicator.style.left = `${(maxX / (total - 1)) * index}px`;
}

/* CLICK SEGMENTS */
segments.forEach((seg, i) => {
  seg.addEventListener("click", () => goTo(i));
});

/* DRAG */
let dragging = false;

slider.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);

document.addEventListener("mousemove", e => {
  if (!dragging) return;

  const rect = slider.getBoundingClientRect();
  let x = e.clientX - rect.left;

  const maxX = slider.offsetWidth - indicator.offsetWidth;
  x = Math.max(0, Math.min(x, maxX));

  indicator.style.left = `${x}px`;

  const index = Math.round((x / maxX) * (total - 1));
  goTo(index);
});

/* MOBILE SWIPE */
let startX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  let current = Math.round(
    Math.abs(track.style.transform.replace(/[^\d]/g, "")) /
    (track.children[0].offsetWidth + 80)
  );

  if (diff > 50 && current < total - 1) goTo(current + 1);
  if (diff < -50 && current > 0) goTo(current - 1);
});
