const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const closeButton = document.querySelector("[data-menu-close]");
const year = document.querySelector("[data-year]");
const projectDialog = document.querySelector("[data-project-dialog]");
const projectOpenButtons = document.querySelectorAll("[data-project-open]");
const projectCloseButton = document.querySelector("[data-project-close]");

function setMenu(open) {
  mobileMenu?.classList.toggle("open", open);
  menuBackdrop?.classList.toggle("open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuButton?.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuButton?.addEventListener("click", () => setMenu(true));
closeButton?.addEventListener("click", () => setMenu(false));
menuBackdrop?.addEventListener("click", () => setMenu(false));
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (year) year.textContent = String(new Date().getFullYear());

projectOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    projectDialog?.showModal();
    document.body.style.overflow = "hidden";
  });
});

function closeProjectDialog() {
  projectDialog?.close();
  document.body.style.overflow = "";
}

projectCloseButton?.addEventListener("click", closeProjectDialog);
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDialog();
});
projectDialog?.addEventListener("close", () => {
  document.body.style.overflow = "";
});
