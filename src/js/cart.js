const cartItemsCount = document.querySelector(".cart__count");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartProductsContainer = document.querySelector(".cart__products");
const cartTotalPrice = document.querySelector(".total__price");

import { formatPrice, totalCartItemsPrice } from "./utilities.js";

const allCartItemPrice = cartItems
  .map((item) => item.totalPrice)
  .reduce((acc, cur) => acc + cur, 0);

for (let cartItem of cartItems) {
  cartProductsContainer.innerHTML += `
   <div class="cart__product">
      <img src=${cartItem.itemImage} alt="" class="product__img" />
      <h3 class="product__title">${cartItem.itemName.split(" ")[0]}</h3>
      <small class="product__price">${formatPrice(cartItem.itemPrice)}</small>

      <div class="counter product__counter">
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

console.log(cartItems, totalCartItemsPrice);
