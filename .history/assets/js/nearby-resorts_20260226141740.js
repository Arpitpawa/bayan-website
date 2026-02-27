const nearbyItems = document.querySelectorAll(".nearby-resort");

/* ===============================
   SCROLL REVEAL (AMAN STYLE)
================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.25
  }
);

nearbyItems.forEach(item => revealObserver.observe(item));

/* ===============================
   LOCATION FILTER (READY)
================================ */
function filterNearby(location) {
  nearbyItems.forEach(item => {
    if (item.dataset.location === location || location === "all") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
