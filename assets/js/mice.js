document.querySelectorAll(".venue-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".venue-item");
    item.classList.toggle("active");
  });
});