const filterButtons = document.querySelectorAll(".filter-btn");
const hotelCards = Array.from(document.querySelectorAll(".hotel-card"));
const hotelsGrid = document.querySelector(".hotels-grid");
const sortSelect = document.getElementById("sortSelect");

// store original order
const originalOrder = [...hotelCards];

let currentFilter = "all";

/* APPLY FILTER */
function applyFilter() {
  hotelCards.forEach(card => {
    if (
      currentFilter === "all" ||
      card.dataset.location === currentFilter
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  applySort();
}

/* APPLY SORT */
function applySort() {
  let visibleCards = hotelCards.filter(
    card => card.style.display !== "none"
  );

  const sortValue = sortSelect.value;

  if (sortValue === "az") {
    visibleCards.sort((a, b) =>
      a.querySelector("h3").innerText.localeCompare(
        b.querySelector("h3").innerText
      )
    );
  }

  if (sortValue === "za") {
    visibleCards.sort((a, b) =>
      b.querySelector("h3").innerText.localeCompare(
        a.querySelector("h3").innerText
      )
    );
  }

  if (sortValue === "recommended") {
    visibleCards = originalOrder.filter(card =>
      card.style.display !== "none"
    );
  }

  visibleCards.forEach(card => hotelsGrid.appendChild(card));
}

/* FILTER EVENTS */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    applyFilter();
  });
});

/* SORT EVENT */
sortSelect.addEventListener("change", applySort);
