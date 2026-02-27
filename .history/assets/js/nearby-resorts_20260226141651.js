document.addEventListener("DOMContentLoaded", () => {

  const nearbyItems = document.querySelectorAll(".nearby-resort");

  // If this page doesn't have nearby resorts, stop immediately
  if (!nearbyItems.length) return;

  /* ===============================
     SCROLL REVEAL (AMAN STYLE)
  ================================ */

  const nearbyRevealObserver = new IntersectionObserver(
    (entries) => {
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

  nearbyItems.forEach(item => nearbyRevealObserver.observe(item));

  /* ===============================
     LOCATION FILTER (READY)
  ================================ */

  window.filterNearby = function(location) {
    nearbyItems.forEach(item => {
      if (item.dataset.location === location || location === "all") {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

});