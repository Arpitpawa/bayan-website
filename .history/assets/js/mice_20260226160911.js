const modal = document.getElementById("eventModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalGuests = document.getElementById("modalGuests");
const modalDesc = document.getElementById("modalDesc");

const eventData = {

  "amargarh-conf1": {
    title: "Conference Room 1 – The Amargarh Resort",
    guests: "100–150 Guests",
    desc: "A 2000 sq ft refined conference space ideal for corporate meetings, seminars and private gatherings."
  },

  "amargarh-conf2": {
    title: "Conference Room 2 – The Amargarh Resort",
    guests: "150–500 Guests",
    desc: "A 3500 sq ft flexible banquet and conference hall suitable for large-scale meetings and celebrations."
  },

  "udai-banquet": {
    title: "New Banquet – The Udai Bagh Resort",
    guests: "800 Guests",
    desc: "A 12000 sq ft grand indoor venue designed for weddings, gala dinners and large celebrations."
  },

  "udai-durbar": {
    title: "Durbar Pre-Function + Conference Hall – The Udai Bagh",
    guests: "200–450 Guests",
    desc: "An elegant combination space including pre-function area, ideal for conferences and formal events."
  },

  "kumbha-darbaar": {
    title: "Darbaar Conference Room – The Kumbhabagh Resort",
    guests: "200 Guests",
    desc: "A 2850 sq ft indoor conference room perfect for corporate meets and curated events."
  },

  "jaibagh-conf": {
    title: "Conference Room – The Jai Bagh",
    guests: "250 Guests",
    desc: "A spacious 5000 sq ft conference hall crafted for formal gatherings and corporate functions."
  },

  "sawaibagh-darbar": {
    title: "Darbar Conference Room – The Sawai Bagh",
    guests: "150 Guests",
    desc: "A 3500 sq ft intimate conference space designed for focused meetings and private events."
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