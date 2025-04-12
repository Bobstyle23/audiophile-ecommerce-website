import {
  formatPrice,
  totalCartItemsPrice,
  addToCart,
  toggleOverlay,
  hasClassOpen,
  toggleElements,
  counterFn,
} from "./utilities.js";

const cartItemsCount = document.querySelector(".cart__count");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartProductsContainer = document.querySelector(".cart__products");
const cartTotalPrice = document.querySelector(".total__price");
const cartBtn = document.querySelector(".header__btn--cart");
const cartDeleteBtn = document.querySelector(".cart__delete-btn");
const cartContainer = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const menu = document.querySelector(".menu");

let cartControl = addToCart();

function toggleCart() {
  toggleElements(cartContainer, menu, overlay);
}

toggleOverlay(overlay, () => {
  if (hasClassOpen(cartContainer)) {
    toggleCart();
  }
});

cartBtn.addEventListener("click", () => {
  const parentContainer = cartContainer.parentNode;
  parentContainer.style.position = "relative";
  toggleCart();
});

cartDeleteBtn.addEventListener("click", () => {
  cartControl.delete();
  toggleCart();
});

if (cartItems.length < 1) {
  cartDeleteBtn.textContent = "";
}

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

[...cartProductsContainer.children].forEach((elem, idx) => {
  const countEl = elem.querySelector(".counter__count");
  const increaseBtn = elem.querySelector(".btn__counter--increase");
  const decreaseBtn = elem.querySelector(".btn__counter--decrease");

  // FIX: Update the count according to cartItems itemCount, i.e cartItems: itemCount = 4, cart: itemCount = 1, increase from 4
  const localCounter = counterFn();

  const updateCount = () => {
    countEl.textContent = localCounter.getValue();
  };

  increaseBtn.addEventListener("click", () => {
    localCounter.increase();
    updateCount();
  });

  decreaseBtn.addEventListener("click", () => {
    localCounter.decrease();
    updateCount();
  });
});

cartItemsCount.textContent += cartItems.length ? `(${cartItems.length})` : "";
cartTotalPrice.textContent = formatPrice(totalCartItemsPrice);
