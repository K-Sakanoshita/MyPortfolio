class PortfolioProject extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = "true";

    const variant = this.getAttribute("variant");
    const title = this.getAttribute("project-title");
    const visuals = {
      playground: `<img src="https://armd-02.github.io/Playgrounds/image/ogimage.png" alt="" loading="lazy">`,
      heritage: `<div class="heritage-map"><span class="river"></span><span class="street street-a"></span><span class="street street-b"></span><span class="castle">城</span><i></i><i></i><i></i></div>`,
      expo: `<div class="globe"><span></span><span></span><span></span></div>`,
      change: `<img src="https://armd-01.sakura.ne.jp/whatsnew/image/whatsnew.png" alt="" loading="lazy">`,
      viewer: `<div class="viewer-window"><span></span><span></span><span></span><i></i><i></i><i></i></div>`,
      community: `<div class="sheet"><i></i><i></i><i></i><i></i></div><div class="map-tile"><span>＋</span></div>`,
      walk: `<img src="https://armd-02.github.io/mapmaker/image/mapmaker.png" alt="" loading="lazy">`
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
