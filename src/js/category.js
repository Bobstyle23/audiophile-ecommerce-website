const searchParams = new URLSearchParams(window.location.search);
const categoryId = searchParams.get("id");
const heading = document.querySelector(".category__heading");
const data = require("./data.json");

const categoryProducts = document.querySelector(".category__products");

heading.textContent = categoryId;

data.forEach((item) => {
  if (item.category === categoryId) {
    console.log(item);
    const categoryProduct = document.createElement("article");
    categoryProduct.classList.add("category__product");
    categoryProduct.classList.add("container");

    categoryProduct.innerHTML = `
          <picture class="category__image">
            <source srcset="${item.image.desktop}" media="(min-width:64em)" type="image/webp" />
            <source srcset="${item.image.tablet}" media="(min-width:48em)" type="image/webp" />
            <img src="${item.image.mobile}" alt="" />
          </picture>
          <div class="category__info">
            <small class="category--new">${item.new ? "New Product" : ""}</small>
            <h2 class="category__name">${item.name}</h2>
            <p class="category__description">${item.description}</p>
            <a href="./category-detail.html?id=${item.slug}" class="btn btn__primary category__link">See Product</a>
          </div>`;
    categoryProducts.appendChild(categoryProduct);
  }
});
