async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    console.error(`Failed to load ${url}:`, res.status);
    return;
  }
  el.innerHTML = await res.text();
}

// highlight current nav item (optional but nice)
function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
}

// If your mobile nav toggle needs JS, initialize it AFTER header loads
function initMobileNav() {
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const primaryNav = document.querySelector("#primary-navigation");
  if (!navToggle || !primaryNav) return;

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.toggleAttribute("data-visible");
  });
}

(async function main() {
  await loadPartial("#site-header", "/partials/header.html");
  await loadPartial("#site-footer", "/partials/footer.html");

  highlightActiveNav();
  initMobileNav();
})();