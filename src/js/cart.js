const cartItemsCount = document.querySelector(".cart__count");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartProductContainer = document.querySelector(".cart__product");
const cartTotalPrice = document.querySelector(".total__price");

const allCartItemPrice = cartItems
  .map((item) => item.totalPrice)
  .reduce((acc, cur) => acc + cur, 0);

for (let cartItem of cartItems) {
}
console.log(cartItems);
