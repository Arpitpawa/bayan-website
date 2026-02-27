const modal = document.getElementById("eventModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalGuests = document.getElementById("modalGuests");
const modalDesc = document.getElementById("modalDesc");

const eventData = {
  garden: {
    title: "Celebration Garden",
    guests: "500 Guests",
    img: "assets/images/mice/garden.webp",
    desc: "A grand open-air venue ideal for weddings and large gatherings."
  },
  courtyard: {
    title: "Central Courtyard",
    guests: "150 Guests",
    img: "assets/images/mice/courtyard.webp",
    desc: "An intimate courtyard surrounded by heritage-inspired architecture."
  },
  conference: {
    title: "Conference Hall",
    guests: "70 Guests",
    img: "assets/images/mice/conference.webp",
    desc: "A refined indoor space designed for corporate meetings and seminars."
  }
};

document.querySelectorAll(".event-item").forEach(item => {
  item.querySelector(".discover-btn").addEventListener("click", () => {
    const key = item.dataset.event;
    const data = eventData[key];

    modalTitle.textContent = data.title;
    modalGuests.textContent = data.guests;
    modalDesc.textContent = data.desc;
    modalImg.src = data.img;

    modal.classList.add("active");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("active");
});