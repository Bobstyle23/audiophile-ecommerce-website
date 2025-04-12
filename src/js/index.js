import { toggleOverlay, hasClassOpen, toggleElements } from "./utilities.js";

const hamburger = document.querySelector(".header__btn--hamburger");
const menu = document.querySelector(".menu");
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const heroProductName = document.querySelector(".hero__title");
const heroLink = document.querySelector(".hero__link");

const productTitles = document.querySelectorAll(".product__title");
const productLinks = document.querySelectorAll(".product__link");

const toggleMenu = () => {
  toggleElements(menu, cart, overlay);
};

toggleOverlay(overlay, () => {
  if (hasClassOpen(menu)) {
    toggleMenu();
  }
});

hamburger.addEventListener("click", () => toggleMenu());

[...menu.children[0].children].forEach((menuItem) => {
  menuItem.addEventListener("click", (event) => {
    event.preventDefault(); /* PERF: prevents default behaviour  */

    const targetUrl = event.target.href;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 350);
    toggleMenu();
  });
});

for (let [index, value] of productTitles.entries()) {
  const productTitle = value.textContent
    .trim()
    .split(" ")
    .filter((item) => Boolean(item) && item !== "\n")
    .join("-");

  productLinks[index].href += productTitle;
}

heroLink.href = `${heroLink.href}${heroProductName.textContent
  .replace("Ⅱ", "two")
  .split(" ")
  .join("-")
  .toLowerCase()}`;
