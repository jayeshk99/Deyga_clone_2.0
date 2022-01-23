let tokenc = document.cookie.split("=")[1];
let hostnamec  = window.location.origin;
console.log(hostnamec)
async function getCart(tokenc){
    let api = `${hostnamec}/cart`;
  
      let response = await fetch(api,{
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${tokenc}`
        }
      });
  
    let cartData = await response.json();  

    localStorage.setItem("cartData", JSON.stringify(cartData));
    return cartData
  }
  
  async function removeFromCart(products){
    let api = `${hostnamec}/cart/deleteProduct`;
    products = JSON.stringify(products);
    let response = await fetch(api,{
      method: "PATCH",
      body: products,
      headers : {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${tokenc}`
      }
    });
  
    let cartData = await response.json();  
    
    localStorage.setItem("cartData", JSON.stringify(cartData));
  
  }

// updating value of cart nos
    if(tokenc === undefined){
        let cartLengthShow = document.querySelector(".dropdown+li>p");
        cartLengthShow.innerText = `Cart(0)`;
    }else{
        let cartLengthShow = document.querySelector(".dropdown+li>p");
        getCart(tokenc).then((cart)=>{
            cartLengthShow.innerText = `Cart (${cart.products.length})`;
        })
    }




// ---------------Appending in cart------------------
function appendCart(cartData) {
    let cartProducts = cartData.products;

    if (!cartProducts.length) {
        document.getElementById("emptyCart").style.display = "flex";
        document.getElementById("showCartProduct").style.display = "none";
        document.getElementById("showCartBottom").style.display = "none";

    } else {
        let showCartProduct = document.getElementById("showCartProduct");
        showCartProduct.innerHTML = "";

        function cartPricing() {
            let totalPrice = 0;
            for (let i = 0; i < cartProducts.length; i++) {
                totalPrice += cartProducts[i].price * cartProducts[i].productQuantity;
            }

            let checkoutBtn = document.querySelector("#showCartBottom>a>button>span:nth-child(3)");
            checkoutBtn.innerText = `  Rs. ${totalPrice} `;
        }
        cartPricing();
        cartProducts.map((el, index) => {

            let showCartProduct = document.getElementById("showCartProduct");


            let cartProductCard = document.createElement("div");
            cartProductCard.setAttribute("class", "cartProductCard");


            let cartProductImg = document.createElement("div");
            cartProductImg.setAttribute("class", "cartProductImg");
            let img = document.createElement("img");
            img.setAttribute("src", el.productImgUrl2[0]);
            cartProductImg.append(img);


            let cartProductDetails = document.createElement("div");
            cartProductDetails.setAttribute("class", "cartProductDetails");
            let nameSpan = document.createElement("span");
            nameSpan.innerText = el.productName;
            let priceSpan = document.createElement("span");
            priceSpan.innerText = `Rs. ${el.price}`;

            let qtySpan = document.createElement("span");
            qtySpan.setAttribute("class", "qtyButton");
            let qtyShowSpan = document.createElement("span");
            qtyShowSpan.innerText = el.productQuantity;
            let reduceQty = document.createElement("span");
            reduceQty.setAttribute("class", "material-icons");
            reduceQty.innerText = "remove";
            reduceQty.addEventListener("click", () => {
                if (el.productQuantity > 1) {
                    el.productQuantity -= 1;
                    qtyShowSpan.innerText = el.productQuantity;

                    localStorage.setItem("cartData", JSON.stringify(cartData));
                    cartPricing();
                }
            });
            let increaseQty = document.createElement("span");
            increaseQty.setAttribute("class", "material-icons");
            increaseQty.innerText = "add";
            increaseQty.addEventListener("click", () => {
                el.productQuantity += 1;
                qtyShowSpan.innerText = el.productQuantity;
                localStorage.setItem("cartData", JSON.stringify(cartData));
                cartPricing();

            });
            let removeBtnSpan = document.createElement("span");
            removeBtnSpan.setAttribute("class", "cartItemRemove");
            removeBtnSpan.innerText = "Remove";
            removeBtnSpan.style.textDecoration = "underline";
            removeBtnSpan.addEventListener("click", () => {
                cartProducts.splice(index, 1);
                localStorage.setItem("cartData", JSON.stringify(cartData));

                let unpopulatedProducts = [];
                for(let i=0; i<cartProducts.length; i++){
                    unpopulatedProducts.push(cartProducts[i]._id);
                }


                removeFromCart(unpopulatedProducts);

                appendCart(cartData);
            })

            qtySpan.append(reduceQty, qtyShowSpan, increaseQty, removeBtnSpan)


            cartProductDetails.append(nameSpan, priceSpan, qtySpan);


            cartProductCard.append(cartProductImg, cartProductDetails);
            showCartProduct.append(cartProductCard);
        })

    }
    // document.querySelector("#showCartBottom>button").addEventListener("click", () => {
    //     let totalPrice = 0;
    //     for (let i = 0; i < cartData.length; i++) {
    //         totalPrice += cartData[i].price * cartData[i].productQuantity;
    //     }
    //     let shippingCharges;
    //     if (totalPrice > 1000) {
    //         shippingCharges = 0;
    //     } else { shippingCharges = 70; }
    //     let paymentDetail = {
    //         subTotal: totalPrice,
    //         discount: 0,
    //         shippingCharges: shippingCharges,
    //         grandTotal: totalPrice + shippingCharges,
    //     }

    //     localStorage.setItem("paymentDetail", JSON.stringify(paymentDetail))
    //     window.location.href = "checkout.html";

    // }
    // )


}
function setPayDetail() {
    // localStorage.setItem("cartData", JSON.stringify(cartData));

}


// // ----------- disabling and enabling body scroll ----------

function disableBodyScroll() {
  const element = document.querySelector("body");
  element.classList.add("stop-scroll");
}
function enableBodyScroll() {
  const element = document.querySelector("body");
  element.classList.remove("stop-scroll");
}

// --------------------------------------------------------------------


let cartBtn = document.querySelector("#submenu>ul>li:nth-child(2)");
cartBtn.addEventListener("click", () => {
    if(tokenc === undefined){
        window.location.href = "/signup"
    }else{
        getCart(tokenc).then((cartData) => {
        appendCart(cartData);
        document.getElementById("cart").style.display = "block";
        window.scrollTo(0, 0);
        document.getElementById("cart").style.marginLeft = "0%";
    
        disableBodyScroll();
        });
    }

  
  
});

let cartCloseBtn = document.querySelector(".cartClose");
cartCloseBtn.addEventListener("click", () => {
    let cartLengthShow = document.querySelector(".dropdown+li>p");
    getCart(tokenc).then((cart)=>{
        cartLengthShow.innerText = `Cart (${cart.products.length})`;
    })
  document.getElementById("cart").style.marginLeft = "100%";
  enableBodyScroll();
});
// export { appendCart, setPayDetail };