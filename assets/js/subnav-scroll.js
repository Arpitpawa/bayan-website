// Run only on desktop
if (window.innerWidth > 900) {
  const links = document.querySelectorAll(".subnav-links a");
  const sections = [];

  links.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push(section);
  });

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSection = section.id;
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}
