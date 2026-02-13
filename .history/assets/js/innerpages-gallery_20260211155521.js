const viewport = document.getElementById("galleryViewport");
const items = document.querySelectorAll(".gallery-item");
const progress = document.getElementById("galleryProgress");

/* ===============================
   CENTER ACTIVE IMAGE
================================ */

function updateActiveImage() {
  const viewportCenter = viewport.scrollLeft + viewport.offsetWidth / 2;

  items.forEach(item => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;

    if (Math.abs(viewportCenter - itemCenter) < item.offsetWidth / 2) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

/* ===============================
   PROGRESS LINE
================================ */

function updateProgress() {
  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  const percent = (viewport.scrollLeft / maxScroll) * 100;
  progress.style.width = percent + "%";
}

/* ===============================
   EVENTS
================================ */

viewport.addEventListener("scroll", () => {
  updateActiveImage();
  updateProgress();
});

window.addEventListener("load", () => {
  updateActiveImage();
  updateProgress();
});
