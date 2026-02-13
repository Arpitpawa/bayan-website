console.log("FEATURED SLIDER LOADED");

const slides = [
  {
    title: "Jaibagh Palace, Jaipur",
    text: "Perched high above the Aravallis, Jaibagh offers sweeping fort views, open skies, and a rare sense of elevation and silence.",
    image: "assets/images/jaibagh-jaipur.webp",
  },
  {
    title: "Kumbha Bagh, Kumbhalgarh",
    text: "Wake up to uninterrupted views of the Kumbhalgarh Fort and the surrounding hills, where history and landscape merge.",
    image: "assets/images/kumbha-bagh-palace.webp",
  },
  {
    title: "The Sawai Bagh",
    text: "Set at the edge of the forest, Sawai Bagh brings you closer to wildlife, wilderness, and unspoiled natural rhythms.",
    image: "assets/images/sawai-bagh.webp",
  },
  {
    title: "The Amargarh, Udaipur",
    text: "A heritage retreat overlooking lakes and rural landscapes, blending old-world charm with everyday village life.",
    image: "assets/images/amargarh-udaipur.webp",
  },
];

let current = 1;

/* ELEMENTS */
const centerImage = document.getElementById("centerImage");
const centerTitle = document.getElementById("centerTitle");
const centerText = document.getElementById("centerText");
const prevTitle = document.getElementById("prevTitle");
const nextTitle = document.getElementById("nextTitle");

const bgLayers = document.querySelectorAll(".bg-layer");
let activeBg = 0;

function updateBackground(image) {
  const nextBg = (activeBg + 1) % 2;
  bgLayers[nextBg].style.backgroundImage = `url(${image})`;
  bgLayers[nextBg].classList.add("active");
  bgLayers[activeBg].classList.remove("active");
  activeBg = nextBg;
}

function updateSlider() {
  const prev = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  /* RESET ANIMATIONS */
  centerTitle.classList.remove("show");
  centerText.classList.remove("show");
  centerImage.classList.remove("show");
  prevTitle.classList.remove("show");
  nextTitle.classList.remove("show");

  setTimeout(() => {
    centerImage.src = slides[current].image;
    centerTitle.textContent = slides[current].title;
    centerText.textContent = slides[current].text;
    prevTitle.textContent = slides[prev].title;
    nextTitle.textContent = slides[next].title;

    /* BACKGROUND */
    updateBackground(slides[current].image);

    /* SHOW WITH FADE */
    centerImage.classList.add("show");
    centerTitle.classList.add("show");
    centerText.classList.add("show");
    prevTitle.classList.add("show");
    nextTitle.classList.add("show");
  }, 150);
}

/* CONTROLS */
document.getElementById("nextBtn").onclick = () => {
  current = (current + 1) % slides.length;
  updateSlider();
};

document.getElementById("prevBtn").onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  updateSlider();
};

updateSlider();
/* ===============================
   LOCAL TIME (RAJASTHAN)
================================ */

function updateLocalTime() {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  document.getElementById("localTime").textContent = now.toLocaleTimeString(
    "en-IN",
    options,
  );
}

updateLocalTime();
setInterval(updateLocalTime, 60000);

/* ===============================
   DIVIDER SCROLL ANIMATION
================================ */

const divider = document.querySelector(".lux-divider");

const dividerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.6 },
);

dividerObserver.observe(divider);

/* ===============================
   FADE-IN ON SCROLL
================================ */

const introSection = document.querySelector(".intro-info");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 },
);

observer.observe(introSection);
/* ===============================
   MAP OVERLAY CONTROLS (FINAL)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const openMap = document.getElementById("openMap");
  const closeMap = document.getElementById("closeMap");
  const mapOverlay = document.getElementById("mapOverlay");
  const mapFrame = document.getElementById("mapFrame");
  const propertySelect = document.getElementById("propertySelect");

  if (!openMap || !closeMap || !mapOverlay || !mapFrame) return;

  // 🔗 Bayan Group Master Map (ALL properties)
  const bayanMapURL =
    "https://www.google.com/maps/d/u/0/embed?mid=1KdcC2jg4-t97to6QNOMmBOvXTE_mpWU&ehbc=2E312F&noprof=1";

  // Open Map
  openMap.addEventListener("click", () => {
    mapOverlay.classList.add("active");
    document.body.classList.add("is-locked");
  });

  function closeMapOverlay() {
    mapOverlay.classList.remove("active");
    document.body.classList.remove("is-locked");
  }

  closeMap.addEventListener("click", closeMapOverlay);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mapOverlay.classList.contains("active")) {
      closeMapOverlay();
    }
  });

  // Dropdown change (UX only – same map)
  propertySelect.addEventListener("change", () => {
    // We keep same map, user visually explores pins
    mapFrame.src = bayanMapURL;
  });
});
/* ================= MOMENTS SCROLL REVEAL ================= */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.25 },
);

revealItems.forEach((item) => revealObserver.observe(item));
/* ======================================================
   INSTAGRAM REELS – RAAS STYLE INFINITE SLIDER (CLEAN)
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".instagram-slider");
  const track = document.querySelector(".insta-track");

  if (!slider || !track) return;

  let cards = Array.from(track.children);
  const gap = 28;

  /* ---- DUPLICATE CARDS FOR TRUE LOOP ---- */
  cards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  cards = Array.from(track.children);

  const cardWidth = cards[0].offsetWidth + gap;
  let index = 0;
  let isPaused = false;

  track.style.display = "flex";
  track.style.transition = "transform 0.7s ease";

  /* ---- AUTO STEP SLIDER (RAAS FEEL) ---- */
  function slideNext() {
    if (isPaused) return;

    index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    if (index >= cards.length / 2) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(0)";
        track.offsetHeight; // reflow
        track.style.transition = "transform 0.7s ease";
      }, 700);
    }
  }

  setInterval(slideNext, 4200);

  /* ---- VIDEO HANDLING ---- */
  function pauseAllVideos() {
    track.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
      v.closest(".insta-card")?.classList.remove("playing");
    });
  }

  track.querySelectorAll(".insta-card").forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.preload = "metadata";

    // DESKTOP
    card.addEventListener("mouseenter", () => {
      pauseAllVideos();
      video.play().catch(() => {});
      card.classList.add("playing");
      isPaused = true;
    });

    card.addEventListener("mouseleave", () => {
      pauseAllVideos();
      isPaused = false;
    });

    // MOBILE TAP
    card.addEventListener("click", () => {
      if (video.paused) {
        pauseAllVideos();
        video.play().catch(() => {});
        card.classList.add("playing");
        isPaused = true;
      } else {
        pauseAllVideos();
        isPaused = false;
      }
    });
  });

  /* ---- MOBILE SWIPE ---- */
  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isPaused = true;
  });

  slider.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) index++;
    if (diff < -50) index--;

    track.style.transform = `translateX(-${index * cardWidth}px)`;
    isPaused = false;
  });
});

document.querySelectorAll(".insta-card").forEach((card) => {
  const video = card.querySelector("video");
  if (!video) return;

  // REQUIRED ATTRIBUTES (MOBILE FIX)
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.preload = "metadata";

  /* DESKTOP HOVER */
  card.addEventListener("mouseenter", () => {
    pauseAllVideos();
    video.currentTime = 0;
    video.play().catch(() => {});
    card.classList.add("playing");
    isPaused = true;
  });

  card.addEventListener("mouseleave", () => {
    pauseAllVideos();
    isPaused = false;
  });

  /* MOBILE TAP */
  card.addEventListener("click", () => {
    if (video.paused) {
      pauseAllVideos();
      video.currentTime = 0;
      video.play().catch(() => {});
      card.classList.add("playing");
      isPaused = true;
    } else {
      pauseAllVideos();
      isPaused = false;
    }
  });
});

/* ---- PAUSE SLIDER ON HOVER ---- */
slider.addEventListener("mouseenter", () => (isPaused = true));
slider.addEventListener("mouseleave", () => (isPaused = false));

/* ---- MOBILE SWIPE SUPPORT ---- */
let startX = 0;
let dragging = false;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  dragging = true;
  isPaused = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  const diff = startX - e.touches[0].clientX;
  position += diff * 0.8;
  startX = e.touches[0].clientX;
  track.style.transform = `translateX(-${position}px)`;
});

slider.addEventListener("touchend", () => {
  dragging = false;
  isPaused = false;
});
