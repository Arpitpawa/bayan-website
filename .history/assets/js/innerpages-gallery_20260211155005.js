const viewport = document.getElementById("galleryViewport");
const items = document.querySelectorAll(".gallery-item");

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

viewport.addEventListener("scroll", updateActiveImage);
window.addEventListener("load", updateActiveImage);
