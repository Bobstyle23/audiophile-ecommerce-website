import {
  formatPrice,
  totalCartItemsPrice,
  addToCart,
  toggleOverlay,
  hasClassOpen,
  toggleElements,
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
const checkoutBtn = document.querySelector(".cart__btn");

let cartControl = addToCart();

function toggleCart() {
  toggleElements(cartContainer, menu, overlay);
}

toggleOverlay(overlay, () => {
  if (hasClassOpen(cartContainer)) {
    toggleCart();
  }
});

if (cartItems.length < 1) {
  checkoutBtn.setAttribute("disabled", true);
}

if (checkoutBtn.hasAttribute("disabled")) {
  checkoutBtn.classList.add("btn__disabled");
  // PERF: disables click event
  checkoutBtn.style.pointerEvents = "none";
}

checkoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = event.target.href;
  }, 250);
  toggleCart();
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
      <h3 class="cart-product__title">${cartItem.itemName}</h3>
      <small class="cart-product__price">${formatPrice(cartItem.itemPrice)}</small>

      <div class="counter cart-product__counter">
        <button type="button" class="btn btn__counter btn__counter--decrease">
          ˗
        </button>
        <span class="counter__count counter__count--cart">${cartItem.itemCount || 1}</span>
        <button type="button" class="btn btn__counter btn__counter--increase">
          +
        </button>
      </div>
    </div>
`;
}

[...cartProductsContainer.children].forEach((elem, idx) => {
  const countEl = elem.querySelector(".counter__count--cart");
  const increaseBtn = elem.querySelector(".btn__counter--increase");
  const decreaseBtn = elem.querySelector(".btn__counter--decrease");

  let count = cartItems[idx].itemCount || 1;

  const updateCount = () => {
    countEl.textContent = count;
    cartItems[idx].itemCount = count;
  };

  increaseBtn.addEventListener("click", () => {
    count++;
    updateCount();
    cartItems[idx].itemCount = count;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  });

  decreaseBtn.addEventListener("click", () => {
    if (count > 1) {
      count--;
      updateCount();
      cartItems[idx].itemCount = count;
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  });
});

cartItemsCount.textContent += cartItems.length ? `(${cartItems.length})` : "";
cartTotalPrice.textContent = formatPrice(totalCartItemsPrice);
