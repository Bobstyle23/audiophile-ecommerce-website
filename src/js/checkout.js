const goBackBtn = document.querySelector(".checkout__back-btn");
const cartItems = JSON.parse(localStorage.getItem("cart"));
const itemsContainer = document.querySelector(".summary__items");
import { formatPrice } from "./utilities.js";

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

goBackBtn.addEventListener("click", () => {
  history.back();
});
