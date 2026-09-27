const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const progressBar = document.querySelector("#scroll-progress-bar");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeToggle = document.querySelector("#theme-toggle");
const storedTheme = (() => {
  try { return localStorage.getItem("site-theme"); } catch { return null; }
})();
const themePreference = storedTheme === "light" || storedTheme === "dark"
  ? storedTheme
  : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  if (!themeToggle) return;
  const light = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute("aria-label", "Switch to " + (light ? "dark" : "light") + " theme");
  themeToggle.title = "Switch to " + (light ? "dark" : "light") + " theme";
  themeToggle.querySelector(".theme-icon").textContent = light ? "◐" : "☼";
}

applyTheme(themePreference);
themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  try { localStorage.setItem("site-theme", nextTheme); } catch { /* Theme remains active for this page view. */ }
});

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    });
  });
}

const copyEmailButton = document.querySelector("#copy-email");
const copyFeedback = document.querySelector("#copy-feedback");
const emailAddress = "vivekduq@gmail.com";

copyEmailButton?.addEventListener("click", async () => {
  let copied = false;
  try {
    await navigator.clipboard.writeText(emailAddress);
    copied = true;
  } catch {
    const input = document.createElement("textarea");
    input.value = emailAddress;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    try { copied = document.execCommand("copy"); } catch { copied = false; }
    input.remove();
  }

  if (copied) {
    copyEmailButton.firstChild.textContent = "Email copied! ";
    copyFeedback.textContent = `Copied ${emailAddress} to your clipboard.`;
    window.setTimeout(() => { copyEmailButton.firstChild.textContent = "Email Vivek "; }, 2200);
  } else {
    copyFeedback.textContent = `Copy this email address: ${emailAddress}`;
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();

const updateScrollEffects = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  progressBar?.style.setProperty("width", `${progress * 100}%`);

  if (!reduceMotion.matches) {
    document.querySelectorAll("[data-parallax]").forEach((shape) => {
      const speed = Number(shape.dataset.parallax) || 0;
      const offset = Math.max(-64, Math.min(64, window.scrollY * speed));
      shape.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }
};

let scrollFrame = 0;
window.addEventListener("scroll", () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateScrollEffects();
    scrollFrame = 0;
  });
}, { passive: true });
window.addEventListener("resize", updateScrollEffects, { passive: true });
updateScrollEffects();

if ("IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const revealItems = document.querySelectorAll(
    ".about-panel, .section-heading, .feature-project, .design-studies, .role-entry, .skill-group, .credential-columns, .contact-section"
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    if (item.classList.contains("role-entry")) {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${visible.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}








