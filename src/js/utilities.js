function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
  });
}

function counterFn() {
  let count = 1;
  return {
    increase() {
      count += 1;
    },
    decrease() {
      if (count > 1) {
        count -= 1;
      }
      return;
    },
    getValue() {
      return count;
    },
  };
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(currentItem) {
  return {
    add() {
      const {
        name: itemName,
        price: itemPrice,
        count: itemCount,
        cartImagePath: itemImage,
      } = currentItem;

      const cartItemIndex = cart.findIndex(
        (item) => item.itemName === itemName,
      );

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].itemCount += itemCount;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart = [...cart, { itemName, itemPrice, itemCount, itemImage }];
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    },

    delete() {
      cart = [];
      localStorage.removeItem("cart");
      localStorage.clear();
    },
  };
}

const totalCartItemsPrice = cart
  .map((item) => item)
  .reduce((acc, cur) => acc + cur.itemPrice * cur.itemCount, 0);

export { formatPrice, counterFn, addToCart, totalCartItemsPrice };
