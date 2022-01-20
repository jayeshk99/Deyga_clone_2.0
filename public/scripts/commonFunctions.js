  // updating cart items value in navbar
  //cartitems
  let cartitemsNo = JSON.parse(localStorage.getItem("cartData"));
  if (cartitemsNo) {
    cartitemsNo = cartitemsNo.length
  } else {
    cartitemsNo = 0
  }

  let cartLengthShow = document.querySelector(".dropdown+li>p>b");

  cartLengthShow.innerText = `Cart (${cartitemsNo})`;

let currUser = JSON.parse(localStorage.getItem("loginUser")) || 0;
  
    if (currUser != 0) {
        document.getElementById("User").textContent = currUser["username"];
        document.getElementById("logoutUser").style.display = "none";
        document.getElementById("loginUser").style.display = "block";
    } else {
        document.getElementById("User").textContent = "Account";
        document.getElementById("logoutUser").style.display = "block";
        document.getElementById("loginUser").style.display = "none";
    }

document.getElementById("logout").addEventListener("click",function(){
    currUser = 0;
    document.getElementById("User").textContent = "Account";
    document.getElementById("logoutUser").style.display = "block";
    document.getElementById("loginUser").style.display = "none";
    localStorage.setItem("loginUser", JSON.stringify(currUser));
    window.location.href = "loginpage.html";
  });

