var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  let aArr = document.querySelectorAll(".menu a");
  if (window.pageYOffset < 775) {
    document.getElementById("navbar").style.backgroundColor = "transparent";

    aArr.forEach((element) => {
      element.style.color = "white";
    });
    document.querySelector(".searchBox>p button").style.color = "white";
    document.querySelector(".searchBox>p>input").removeAttribute("class");
    document.querySelector(".searchBox>p>input").style.borderBottom =
      "1px solid white";
    document.querySelector("#submenu>ul>li:nth-child(2)").style.color =
      "white";
    document.querySelector("#submenu>ul>li:nth-child(1)").style.color =
      "white";
    document.querySelector(".header-lists>ul>li:nth-child(1)>p").style.color =
      "white";
    document.querySelector(".header-lists>ul>li:nth-child(2)>p").style.color =
      "white";
    document.querySelector(".header-lists>ul>li:nth-child(3)>p").style.color =
      "white";
  } else {
    document.getElementById("navbar").style.backgroundColor = "white";
    aArr.forEach((element) => {
      element.style.color = "black";
    });
    document.querySelector(".searchBox>p button").style.color = "black";
    document
      .querySelector(".searchBox>p>input")
      .setAttribute("class", "blackBox");
    document.querySelector(".searchBox>p>input").style.borderBottom =
      "1px solid black";
    document.querySelector("#submenu>ul>li:nth-child(2)").style.color =
      "black";
    document.querySelector("#submenu>ul>li:nth-child(1)").style.color =
      "black";
    document.querySelector(".header-lists>ul>li:nth-child(1)>p").style.color =
      "black";
    document.querySelector(".header-lists>ul>li:nth-child(2)>p").style.color =
      "black";
    document.querySelector(".header-lists>ul>li:nth-child(3)>p").style.color =
      "black";
  }
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos >= currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-183px";
  }
  prevScrollpos = currentScrollPos;
};
onscroll();

// -----------------------------------------------------------------------------------

localStorage.setItem("couponFlag", JSON.stringify(false));
// best seller section js
document.getElementById("best").style.cursor = "pointer";
document.getElementById("combo").style.cursor = "pointer";
let showBestSeller = () => {
  document.getElementById("bestSeller").style.display = "block";
  document.getElementById("combos").style.display = "none";
  document.getElementById("best").style.textDecoration = "underline";
  document.getElementById("combo").style.textDecoration = "none";
};
let showCombos = () => {
  document.getElementById("best").style.textDecoration = "none";
  document.getElementById("combo").style.textDecoration = "underline";
  document.getElementById("bestSeller").style.display = "none";
  document.getElementById("combos").style.display = "block";
};
showBestSeller();
// founders section js
let showAbout = () => {
  document.getElementById("aboutBtn").setAttribute("class", "selected");
  document.getElementById("pureBtn").removeAttribute("class");
  document.getElementById("promiseBtn").removeAttribute("class");

  document.getElementById("founderInfo").style.display = "block";
  document.getElementById("pure").style.display = "none";
  document.getElementById("promise").style.display = "none";
};
let showPure = (e) => {
  document.getElementById("aboutBtn").removeAttribute("class");
  document.getElementById("pureBtn").setAttribute("class", "selected");
  document.getElementById("promiseBtn").removeAttribute("class");

  document.getElementById("founderInfo").style.display = "none";
  document.getElementById("pure").style.display = "block";
  document.getElementById("promise").style.display = "none";
};
let showQuality = (e) => {
  document.getElementById("aboutBtn").removeAttribute("class");
  document.getElementById("pureBtn").removeAttribute("class");
  document.getElementById("promiseBtn").setAttribute("class", "selected");

  document.getElementById("founderInfo").style.display = "none";
  document.getElementById("pure").style.display = "none";
  document.getElementById("promise").style.display = "block";
};
showAbout();

function responsiveJkSlider() {
  var slideList = document.querySelector("#sliderjk");

  var count = 1;

  function prevJkSlide() {
    if (count > 1) {
      count = count - 2;
      slideList.style.left = "-" + count * 280 + "px";

      document.getElementById("nextjk").style.opacity = 1;

      count++;
    } else {
      document.getElementById("prevjk").style.opacity = 0.5;
    }
  }

  function nextJkSlide() {
    if (count <= 3) {
      slideList.style.left = "-" + count * 280 + "px";

      document.getElementById("prevjk").style.opacity = 1;
      count++;
    } else {
      document.getElementById("nextjk").style.opacity = 0.5;
    }
  }
  document.getElementById("prevjk").addEventListener("click", prevJkSlide);
  document.getElementById("nextjk").addEventListener("click", nextJkSlide);
}

responsiveJkSlider();

// main slider js code
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function responsivewatchSlider() {
  var slideList = document.querySelector(".slider");

  var count = 1;
  var click = 2;
  var size = document.querySelector(".slider").offsetWidth;
  if (size < 998) {
    click = 2;
  }
  if (count == 1) {
    document.getElementById("prevwatch").style.opacity = 0;
    document.getElementById("prevwatch").style.display = "hidden";
  }

  function prevwatchSlide() {
    if (count == 2) {
      document.getElementById("prevwatch").style.opacity = 0;
    }
    if (count > 1) {
      count = count - 2;
      slideList.style.left = "-" + count * 1300 + "px";

      document.getElementById("nextwatch").style.opacity = 1;

      count++;
    } else {
      document.getElementById("prevwatch").style.opacity = 0;
      document.getElementById("prevwatch").style.display = "hidden";
    }
  }

  function nextwatchSlide() {
    if (count == click - 1) {
      document.getElementById("nextwatch").style.opacity = 0;
      document.getElementById("nextwatch").style.display = "hidden";
    }
    if (count < click + 1) {
      slideList.style.left = "-" + count * 1300 + "px";

      document.getElementById("prevwatch").style.opacity = 1;
      count++;
    } else {
      document.getElementById("nextwatch").style.opacity = 0;
      document.getElementById("nextwatch").style.display = "hidden";
    }
  }
  document
    .getElementById("prevwatch")
    .addEventListener("click", prevwatchSlide);
  document
    .getElementById("nextwatch")
    .addEventListener("click", nextwatchSlide);
}
let page = (name) => {
  var pageName = localStorage.getItem("pageName") || "";
  localStorage.setItem("pageName", name);
};
responsivewatchSlider();


