const hamburger = document.querySelector(".header__btn--hamburger");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

const toggleMenu = () => {
  menu.classList.toggle("open");
  overlay.classList.toggle("overlay__hidden");
};

hamburger.addEventListener("click", () => toggleMenu());

overlay.addEventListener("click", () => toggleMenu());

[...menu.children[0].children].forEach((menuItem) => {
  menuItem.addEventListener("click", (event) => toggleMenu());
});
