const cartItemsCount = document.querySelector(".cart__count");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartProductsContainer = document.querySelector(".cart__products");
const cartTotalPrice = document.querySelector(".total__price");
const cartBtn = document.querySelector(".header__btn--cart");
const cartContainer = document.querySelector(".cart");

import { formatPrice, totalCartItemsPrice } from "./utilities.js";

cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("move-to-top");
  const parentContainer = cartContainer.parentNode;
  parentContainer.style.position = "relative";
});

for (let cartItem of cartItems) {
  cartProductsContainer.innerHTML += `
   <div class="cart__product">
      <img src=${cartItem.itemImage} alt="" class="cart-product__img" />
      <h3 class="cart-product__title">${cartItem.itemName.split(" ")[0]}</h3>
      <small class="cart-product__price">${formatPrice(cartItem.itemPrice)}</small>

      <div class="counter cart-product__counter">
        <button type="button" class="btn btn__counter btn__counter--decrease">
          ˗
        </button>
        <span class="counter__count">${cartItem.itemCount || 1}</span>
        <button type="button" class="btn btn__counter btn__counter--increase">
          +
        </button>
      </div>
    </div>
`;
}

cartItemsCount.textContent += cartItems.length ? `(${cartItems.length})` : "";
cartTotalPrice.textContent = formatPrice(totalCartItemsPrice);
