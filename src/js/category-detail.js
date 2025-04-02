const allDetailData = JSON.parse(sessionStorage.getItem("productData"));
const searchParam = new URLSearchParams(window.location.search);
const productSlug = searchParam.get("id");
const productIncludeList = document.querySelector(".included__list");
const featuresContainer = document.querySelector(".features");
const recommendations = document.querySelector(".recommendations");

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
    <a href="#" class="btn btn__primary recommendation__link">See product</a>
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

console.log(others);
