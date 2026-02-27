<script>
const track = document.getElementById("roomsTrack");
const slides = document.querySelectorAll(".room-slide");
const prevBtn = document.getElementById("roomPrev");
const nextBtn = document.getElementById("roomNext");

let currentIndex = 0;

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});
</script>