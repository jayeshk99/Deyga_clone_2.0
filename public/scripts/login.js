    // ----------- disabling and enabling body scroll ----------

    function disableBodyScroll() {
        const element = document.querySelector("body");
        element.classList.add("stop-scroll");
      }
      function enableBodyScroll() {
        const element = document.querySelector("body");
        element.classList.remove("stop-scroll");
      }

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