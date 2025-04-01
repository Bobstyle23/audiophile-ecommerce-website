const allDetailData = JSON.parse(sessionStorage.getItem("productData"));
const searchParam = new URLSearchParams(window.location.search);
const productSlug = searchParam.get("id");

const productDetail = allDetailData.find(
  (element) => element.slug === productSlug,
);

console.log(productDetail);
