const allDetailData = JSON.parse(sessionStorage.getItem("productData"));
const searchParam = new URLSearchParams(window.location.search);
const productSlug = searchParam.get("id");
const productIncludeList = document.querySelector(".included__list");
const featuresContainer = document.querySelector(".features");
const recommendations = document.querySelector(".recommendations");
const galleryContainer = document.querySelector(".gallery");

const categoryDetailImage = document.querySelector(".detail__image").children;
const goBackBtn = document.querySelector(".detail__back-btn");
const detailNew = document.querySelector(".detail--new");
const detailName = document.querySelector(".detail__name");
const detailDesc = document.querySelector(".detail__description");
const detailPrice = document.querySelector(".detail__price");
const addToCartBtn = document.querySelector(".detail__add-to-cart");

const counter = document.querySelector(".counter__count");
const counterIncreaseBtn = document.querySelector(".btn__counter--increase");
const counterDecreaseBtn = document.querySelector(".btn__counter--decrease");

const {
  includes,
  gallery,
  name,
  others,
  description,
  features,
  categoryImage,
  new: isNew,
  price,
  slug,
} = allDetailData.find((element) => element.slug === productSlug);

// NOTE: category hero

goBackBtn.addEventListener("click", () => {
  history.back();
});

const categoryDetailImages = Object.values(categoryImage).reverse();

for (let [index, value] of categoryDetailImages.entries()) {
  categoryDetailImage[index].srcset = value;
}

isNew ? (detailNew.textContent = "New Product") : "";
detailName.textContent = name;
detailDesc.textContent = description;
detailPrice.textContent = price.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 4,
});

// PERF: counter function
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

let count = counterFn();

let currentItemData = {
  ...allDetailData.find((element) => element.slug === productSlug),
  count: count.getValue(),
  cartImagePath: `./img/cart/image-${slug}.webp`,
};

function updateCountValue() {
  counter.textContent = count.getValue();
  currentItemData.count = count.getValue();
}

counterIncreaseBtn.addEventListener("click", () => {
  count.increase();
  updateCountValue();
});

counterDecreaseBtn.addEventListener("click", () => {
  count.decrease();
  updateCountValue();
});

// PERF: add to cart
function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    add() {
      const {
        name: itemName,
        price: itemPrice,
        count: itemCount,
        cartImagePath: itemImage,
      } = currentItemData;

      const totalPrice = itemPrice * itemCount;

      const cartItemIndex = cart.findIndex(
        (item) => item.itemName === itemName,
      );

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].itemCount += itemCount;
        cart[cartItemIndex].totalPrice += totalPrice;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart = [...cart, { itemName, totalPrice, itemCount, itemImage }];
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      const totalCartItemPrice = cart.reduce(
        (accumulator, current) => accumulator + current.totalPrice,
        0,
      );
    },

    delete() {
      cart = [];
      localStorage.removeItem("cart");
      localStorage.clear();
    },
  };
}

const updateCart = addToCart();

addToCartBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updateCart.add();
});

// NOTE: gallery
for (let galleryImg in gallery) {
  galleryContainer.innerHTML += `
  <picture class="gallery__image gallery__image--${galleryImg}">
    <source
      srcset=${gallery[galleryImg].desktop}
      media="(min-width: 75em)"
      type="image/webp"
    />
    <source
      srcset=${gallery[galleryImg].tablet}
      media="(min-width: 48em)"
      type="image/webp"
    />
    <img
      src=${gallery[galleryImg].mobile}
      alt=""
    />
  </picture>
`;
}

// NOTE: recommendations
for (let recommended of others) {
  const recommendationContainer = document.createElement("article");
  recommendationContainer.classList.add("recommendation");
  recommendationContainer.innerHTML = `
   <picture class="recommendation__image">
      <source
        srcset=${recommended.image.desktop}
        media="(min-width: 75em)"
        type="image/webp"
      />
      <source
        srcset=${recommended.image.tablet}
        media="(min-width: 48em)"
        type="image/webp"
      />
      <img
        src=${recommended.image.mobile}
        alt=""
      />
    </picture>
    <h3 class="recommendation__title">${recommended.name}</h3>
    <a href="./category-detail.html?id=${recommended.slug}" class="btn btn__primary recommendation__link">See product</a>
`;
  recommendations.appendChild(recommendationContainer);
}

// NOTE: features
for (let featureText of features.split("\n\n")) {
  const featuresParagraph = document.createElement("p");
  featuresParagraph.classList.add("features__text");

  featuresParagraph.textContent = featureText;
  featuresContainer.appendChild(featuresParagraph);
}

// NOTE: included list
for (let included of includes) {
  let productIncludeItem = document.createElement("li");
  let productIncludeItemQuantity = document.createElement("span");
  productIncludeItem.classList.add("included__list--item");
  productIncludeItemQuantity.textContent = `${included.quantity}x`;
  productIncludeItem.textContent = `${included.item}`;
  productIncludeItem.prepend(productIncludeItemQuantity);
  productIncludeList.appendChild(productIncludeItem);
}
