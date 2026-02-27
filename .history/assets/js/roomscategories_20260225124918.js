document.addEventListener("DOMContentLoaded", function () {

  const track = document.getElementById("roomsTrack");
  const slides = document.querySelectorAll(".room-slide");
  const prevBtn = document.getElementById("roomPrev");
  const nextBtn = document.getElementById("roomNext");
  const progressBar = document.getElementById("roomsProgressBar");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideInterval;
  let startX = 0;
  let isDragging = false;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update progress
    if (progressBar) {
      const progressPercent = ((currentIndex + 1) / slides.length) * 100;
      progressBar.style.width = progressPercent + "%";
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  // Buttons
  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  // Auto slow luxury scroll
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000); // 6 sec luxury pace
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();

  // Pause on hover (desktop)
  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  // Swipe Support (Mobile)
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide();
  });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }

    isDragging = false;
    startAutoSlide();
  });

  updateSlider();
});
document.querySelectorAll(".venue-toggle").forEach(button => {

  button.addEventListener("click", function () {

    const item = this.closest(".venue-item");

    // Close other open items
    document.querySelectorAll(".venue-item").forEach(el => {
      if (el !== item) {
        el.classList.remove("active");
      }
    });

    // Toggle current
    item.classList.toggle("active");

  });

});