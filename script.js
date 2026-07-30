class PortfolioProject extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = "true";

    const variant = this.getAttribute("variant");
    const title = this.getAttribute("project-title");
    const visuals = {
      expo: `<div class="globe"><span></span><span></span><span></span></div>`,
      change: `<svg viewBox="0 0 480 280" aria-hidden="true"><path d="M-20 192c70-19 89-92 148-75s62 74 130 49 62-96 132-75 64 68 112 55"/><path d="M-10 238c59-42 102-27 140-70s92-32 124 8 79 53 129 10 85-26 116-8"/><g><circle cx="128" cy="117" r="9"/><circle cx="258" cy="166" r="9"/><circle cx="390" cy="91" r="9"/></g></svg>`,
      viewer: `<div class="viewer-window"><span></span><span></span><span></span><i></i><i></i><i></i></div>`,
      community: `<div class="sheet"><i></i><i></i><i></i><i></i></div><div class="map-tile"><span>＋</span></div>`,
      walk: `<div class="paper-map"><svg viewBox="0 0 220 160" aria-hidden="true"><path d="M-10 120C42 98 48 34 96 64s35 66 77 34 28-54 65-70"/><circle cx="97" cy="64" r="8"/><circle cx="174" cy="97" r="8"/></svg></div>`
    };

    this.classList.add("project-card", "reveal");
    if (this.hasAttribute("featured")) this.classList.add("project-featured");
    this.innerHTML = `
      <a href="${this.getAttribute("href")}" target="_blank" rel="noreferrer" aria-label="${title}を開く">
        <div class="project-visual ${variant}-visual">
          ${visuals[variant]}
          <span class="project-number">${this.getAttribute("number")}</span>
        </div>
        <div class="project-body">
          <div class="project-meta"><span>${this.getAttribute("meta")}</span><span>${this.getAttribute("tech")}</span></div>
          <h3>${title}</h3>
          <p>${this.getAttribute("description")}</p>
          <span class="project-link">${this.getAttribute("cta")} <b aria-hidden="true">↗</b></span>
        </div>
      </a>`;
  }
}

customElements.define("portfolio-project", PortfolioProject);

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

navigation?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.style.overflow = "";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
