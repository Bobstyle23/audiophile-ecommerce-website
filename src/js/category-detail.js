const allDetailData = JSON.parse(sessionStorage.getItem("productData"));
const searchParam = new URLSearchParams(window.location.search);
const productSlug = searchParam.get("id");
const productIncludeList = document.querySelector(".included__list");
const featuresContainer = document.querySelector(".features");

const {
  includes,
  gallery,
  name,
  others,
  description,
  features,
  categoryImage,
  price,
} = allDetailData.find((element) => element.slug === productSlug);

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

console.log(others);
