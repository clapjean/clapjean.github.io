const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const navigationLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = [...document.querySelectorAll("[data-section]")];

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

document.addEventListener("keydown", (event) => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (event.key === "Escape" && isOpen) {
    closeMenu();
    menuButton.focus();
  }
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleSection) return;

      navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.6] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
