let productDetailData = JSON.parse(localStorage.getItem("clickedProduct"));
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];


// -------------------path of page-----------------------------
// let path = document.getElementById("path");
// let pathDiv = document.createElement("div");
// pathDiv.setAttribute("id", "pathDiv");
// pathDiv.innerHTML = `<a href="index.html" class="linkPath">Home ></a>
// <a href="category.html" class="linkPath" id="clickedCat"></a>
// <a href="" class="linkPath">${productDetailData.productName}</a>`;
// path.append(pathDiv);
// -----------nav hiding & showing on scroll ----------------

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-180px";
  }
  prevScrollpos = currentScrollPos;
};

// ---------------------------------------------------------------------------------------------------------
quantityDiv.append(minusBtn, showQuantity, plusBtn);
productQuantityDiv.append(quantitySpan, quantityDiv);
let freeDilv = document.createElement("p");
freeDilv.setAttribute("class", "paraGreen");

freeDilv.textContent = "Get free shipping on prepaid orders above Rs. 1400";

let btnDiv = document.createElement("div");
btnDiv.setAttribute("id", "btnDiv");
let addToCartBtn = document.createElement("button");
addToCartBtn.setAttribute(
  "class",
  "addToCart-hover-underline-animation addToCartBtn"
);
addToCartBtn.textContent = "ADD TO CART";

let viewCartBtn = document.createElement("button");
viewCartBtn.textContent = "PROCEED TO CART";
viewCartBtn.style.display = "none";

addToCartBtn.addEventListener("click", () => {
  viewCartBtn.style.display = "block";
  addToCartBtn.style.display = "none";
  cartData.push(productDetailData);
  localStorage.setItem("cartData", JSON.stringify(cartData));
});

viewCartBtn.addEventListener("click", () => {
  document.getElementById("cart").style.display = "block";
  window.scrollTo(0, 0);
  appendCart();
  document.getElementById("cart").style.marginLeft = "0%";
  disableBodyScroll();
});
viewCartBtn.setAttribute(
  "class",
  "viewCarthover-underline-animation addToCartBtn"
);
let buyItNowBtn = document.createElement("button");
buyItNowBtn.setAttribute("id", "buyItNowBtn");
buyItNowBtn.setAttribute("class", "buyItNowBtnhover-underline-animation");
buyItNowBtn.textContent = "BUY IT NOW";
buyItNowBtn.addEventListener("click", () => {
  window.location.href = "payment.html";
});
btnDiv.append(addToCartBtn, viewCartBtn, buyItNowBtn);

let naturalImgDiv = document.createElement("div");
naturalImgDiv.setAttribute("id", "naturalImgDiv");
let naturalImg = document.createElement("img");
naturalImg.setAttribute("id", "naturalImg");
naturalImg.src =
  "https://cdn.shopify.com/s/files/1/0034/7901/1441/files/Untitled_design_1_ffb99d9a-dabf-45a3-b489-fcca97415010.png?v=1595966482";
naturalImgDiv.append(naturalImg);

let howToUseDiv = document.createElement("div");
howToUseDiv.setAttribute("id", "howToUseDiv");
let productDesBtn = ["Description", "How to Use"];
let productDesBtnData = [
  "The Charcoal Soap Bar is perfect for times when you'd want to take a thoroughly cleansing shower at the end of a messy, grimy day. Also, using our Charcoal soap bar consistently on your face can reduce or eliminate acne, bumps and blackheads. So if you suffer from any of these, we’d recommend you use this as a part of your daily regimen.",
];
productDesBtn.forEach((el, i) => {
  let descBtn = document.createElement("button");
  descBtn.setAttribute("class", "descBtn");

  descBtn.textContent = el;
  descBtn.addEventListener("click", () => {
    descBtn.style.backgroundColor = "black";
    descBtn.style.color = "white";
    showDescDetail(i);
  });

  howToUseDiv.append(descBtn);
});
let showDesc = document.createElement("div");
showDesc.setAttribute("id", "showDesc");

let showDescDetail = (i) => {
  if (i === 0) {
    showDesc.textContent = productDesBtnData[i];
  } else {
    showDesc.innerHTML = `<img id="showDescImg"src="https://cdn.shopify.com/s/files/1/0034/7901/1441/files/HERBAL_HAIR_PACK-01_480x480.jpg?v=1577109782"></img>`;
  }
};

productDescriptionContainer.append(
  productNameDiv,
  productSizeDiv,
  productQuantityDiv,
  freeDilv,
  btnDiv,
  naturalImgDiv,
  howToUseDiv,
  showDesc
);
// ---------------------------------------------------------------------------------------------------------------



let clickedCategory = JSON.parse(localStorage.getItem("clickedCategory"));
let productData = JSON.parse(localStorage.getItem(`${clickedCategory}`));
let camelArr = [
  "skinCare",
  "babyCareProduct",
  "menProduct",
  "comboProduct",
  "hairCareData",
  "bathBody",
  "OralCare",
  "wellNess",
];
let nameArr = [
  "Skin Care",
  "Baby Care",
  "Men",
  "Combo",
  "Hair Care",
  "Bath & Body",
  "Oral Care",
  "Wellness",
];
for (let k = 0; k < camelArr.length; k++) {
  if (clickedCategory === camelArr[k]) {
    document.getElementById("clickedCat").textContent = `${nameArr[k]} >`;
    break;
  }
}

