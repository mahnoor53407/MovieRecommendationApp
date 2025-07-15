const search = document.querySelector("#searchIcon");
const Image = document.querySelector(".img1");
search.addEventListener("click", function () {
  window.location.href = "/search.html";
});
Image.addEventListener("click", function () {
  window.location.href = "/details.html";
});
