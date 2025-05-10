import { formatPrice } from "./utilities.js";
const goBackBtn = document.querySelector(".checkout__back-btn");
const cartItems = JSON.parse(localStorage.getItem("cart"));
const itemsContainer = document.querySelector(".summary__items");
const itemsTotalPrice = document.querySelector(".summary__amount-total");
const vat = document.querySelector(".vat");
const itemsGrandTotalPrice = document.querySelector(".grand-total");
const paymentMethods = document.getElementsByName("payment");
const eMoneyNumberInputs = document.querySelector(".form__numbers");

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
 <h3 class="items__name">${item.itemName.split(" ")[0]}</h3>
 <small class="items__price">${formatPrice(item.itemPrice)}</small>
 <p class="items__count">x${item.itemCount}</p>
</div>
`;
}

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
