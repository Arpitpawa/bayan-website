document.addEventListener("DOMContentLoaded", function () {

  const viewport = document.getElementById("galleryViewport");
  const progress = document.getElementById("galleryProgress");

  if (!viewport) return;

  /* ================= PROGRESS BAR ================= */

  function updateProgress() {
    const scrollLeft = viewport.scrollLeft;
    const scrollWidth = viewport.scrollWidth - viewport.clientWidth;
    const percent = (scrollLeft / scrollWidth) * 100;
    progress.style.width = percent + "%";
  }

  viewport.addEventListener("scroll", updateProgress);

  /* ================= DRAG TO SCROLL (DESKTOP) ================= */

  let isDown = false;
  let startX;
  let scrollLeft;

  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    viewport.style.cursor = "grabbing";
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener("mouseleave", () => {
    isDown = false;
    viewport.style.cursor = "grab";
  });

  viewport.addEventListener("mouseup", () => {
    isDown = false;
    viewport.style.cursor = "grab";
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 2;
    viewport.scrollLeft = scrollLeft - walk;
  });

});