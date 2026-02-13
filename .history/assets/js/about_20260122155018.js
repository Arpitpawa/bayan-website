document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach(el => observer.observe(el));
});
const poster = document.getElementById("videoPoster");
const video = document.getElementById("bayanFeelingVideo");
const playBtn = document.getElementById("bayanPlayBtn");

if (poster && video && playBtn) {
  playBtn.addEventListener("click", () => {
    poster.style.display = "none";
    video.style.display = "block";
    video.play();
  });
}


document.addEventListener("DOMContentLoaded", () => {

  const sliderImages = [
    "assets/images/global-slider/1.jpg",
    "assets/images/global-slider/2.jpg",
    "assets/images/global-slider/3.jpg"
  ];

  let sliderIndex = 0;
  const slicedSlider = document.getElementById("slicedImage");

  if (slicedSlider) {
    slicedSlider.style.backgroundImage = `url(${sliderImages[0]})`;

    setInterval(() => {
      sliderIndex = (sliderIndex + 1) % sliderImages.length;
      slicedSlider.style.backgroundImage =
        `url(${sliderImages[sliderIndex]})`;
    }, 6000);
  }

});

