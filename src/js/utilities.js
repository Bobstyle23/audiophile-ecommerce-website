function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 5,
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

function toggleOverlay(toggleItem, toggleCallback) {
  return toggleItem.addEventListener("click", () => toggleCallback());
}

function hasClassOpen(element) {
  return element.classList.contains("open");
}

function toggleElements(mainElement, checkElement, overlay) {
  if (hasClassOpen(checkElement)) {
    checkElement.classList.remove("open");
    setTimeout(() => {
      mainElement.classList.add("open");
    });
  } else {
    mainElement.classList.toggle("open");
    overlay.classList.toggle("overlay__hidden");
  }
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    renderCartItems() {
      document.querySelector(".cart__products").innerHTML = "";

      console.log("RENDERING...");
      console.log("ITEMS:", cartItems);

      for (let cartItem of cartItems) {
        document.querySelector(".cart__products").innerHTML += `
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
      </div>`;
      }
      return cartItems;
    },
    cartItemsLength() {
      return cartItems.length;
    },
  };
}

const totalCartItemsPrice = cart
  .map((item) => item)
  .reduce((acc, cur) => acc + cur.itemPrice * cur.itemCount, 0);

export {
  formatPrice,
  counterFn,
  addToCart,
  totalCartItemsPrice,
  toggleOverlay,
  hasClassOpen,
  toggleElements,
  renderCart,
};
