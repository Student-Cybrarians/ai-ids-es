// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Optional: highlight current page link by URL
const navAnchors = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname.split("/").pop();

navAnchors.forEach((a) => {
  const hrefFile = a.getAttribute("href").split("/").pop();
  if (hrefFile === currentPath && !a.classList.contains("active")) {
    a.classList.add("active");
  }
});
