import { formatPrice, addToCart } from "./utilities.js";
const overlay = document.querySelector(".overlay");
const checkoutContainer = document.querySelector(".checkout__container");
const goBackBtn = document.querySelector(".checkout__back-btn");
const cartItems = JSON.parse(localStorage.getItem("cart"));
const itemsContainer = document.querySelector(".summary__items");
const itemsTotalPrice = document.querySelector(".summary__amount-total");
const vat = document.querySelector(".vat");
const itemsGrandTotalPrice = document.querySelector(".grand-total");
const paymentMethods = document.getElementsByName("payment");
const eMoneyNumberInputs = document.querySelector(".form__numbers");
const payBtn = document.querySelector(".summary__btn");

const confirmationContainer = document.querySelector(".confirmation");
const confirmedOrdersContainer = document.querySelector(
  ".confirmation__orders",
);
const confirmBtn = document.querySelector(".confirmation__btn");

const totalCartItemsPrice = cartItems.reduce(
  (acc, cur) => acc + cur.itemPrice * cur.itemCount,
  0,
);
const totalPriceWithVat = Math.floor(totalCartItemsPrice * 0.2);
const grandTotal = totalCartItemsPrice + totalPriceWithVat + 50;

for (let item of cartItems) {
  itemsContainer.innerHTML += `
<div>
 <img src=${item.itemImage} class="items__img" />
 <h3 class="items__name">${item.itemName}</h3>
 <small class="items__price">${formatPrice(item.itemPrice)}</small>
 <p class="items__count">x${item.itemCount}</p>
</div>
`;
}

const cartController = addToCart();

function removeModal() {
  overlay.classList.add("overlay__hidden");
  confirmationContainer.classList.remove("confirmation__active");
  cartController.delete();
}

payBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    confirmationContainer.classList.add("confirmation__active");
    overlay.classList.remove("overlay__hidden");
  }, 700);
});

confirmBtn.addEventListener("click", function (event) {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = event.target.href;
  }, 200);
  removeModal();
});

const othersHTML =
  cartItems.length - 1 > 0
    ? ` <div class="line"></div>
        <p>and ${cartItems.length - 1} other item(s)</p>`
    : "<p></p>";

confirmedOrdersContainer.innerHTML = `
  <div class="orders">
   <img src=${cartItems[0].itemImage} class="orders__img" />
   <h3 class="orders__name">${cartItems[0].itemName}</h3>
   <small class="order__price">${formatPrice(cartItems[0].itemPrice)}</small>
   <p class="order___count">x${cartItems[0].itemCount}</p>
     ${othersHTML}
  </div>
  
  <div class="total">
   <h3>Grand Total</h3>
   <p>${formatPrice(grandTotal)}</p>
  </div>
`;

itemsTotalPrice.textContent = formatPrice(totalCartItemsPrice);

vat.textContent = formatPrice(Number(totalPriceWithVat));
goBackBtn.addEventListener("click", () => {
  history.back();
});

itemsGrandTotalPrice.textContent = formatPrice(grandTotal);

paymentMethods.forEach((method) => {
  method.addEventListener("change", (event) => {
    const isCash = event.target.value === "cash";
    [...eMoneyNumberInputs.children].forEach((element) => {
      if (element.nodeType === 1) {
        element.classList.toggle("hidden", isCash);
      }
    });
  });
});

function handleResize() {
  const isDesktop = window.innerWidth >= 1200;
  checkoutContainer.classList.toggle("container", isDesktop);
  if (isDesktop) {
    checkoutContainer.style.width = "111rem";
  } else {
    checkoutContainer.style.width = "100%";
  }
}

handleResize();

window.addEventListener("resize", function () {
  handleResize();
});
