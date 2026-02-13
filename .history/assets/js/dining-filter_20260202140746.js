const tabs = document.querySelectorAll(".dining-tabs button");
const cards = document.querySelectorAll(".dining-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const city = tab.dataset.city;

    cards.forEach(card => {
      card.style.display =
        city === "all" || card.dataset.city === city
          ? "block"
          : "none";
    });
  });
});
