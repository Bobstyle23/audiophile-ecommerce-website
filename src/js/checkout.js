const goBackBtn = document.querySelector(".checkout__back-btn");

goBackBtn.addEventListener("click", () => {
  history.back();
});
