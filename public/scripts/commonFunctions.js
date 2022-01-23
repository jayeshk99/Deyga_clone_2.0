
let token2 = document.cookie.split("=")[1];
let hostname  = window.location.origin;
async function getProfile(token2){
  let api = `${hostname}/verifyToken`;

  let response = await fetch(api,{
          headers : {
              "Content-Type" : "application/json",
              "Authorization": `Bearer ${token2}`
          }
  });

  let userData = await response.json();

return userData;

}


async function updateUser(){
  if(token2 === undefined){
    document.getElementById("User").textContent = "Account";
    document.getElementById("logoutUser").style.display = "block";
    document.getElementById("loginUser").style.display = "none";
  }
 else {
    let user = await getProfile(token2);
    document.getElementById("User").textContent =
      "Hello" + " " + user.first_name;
    document.getElementById("logoutUser").style.display = "none";
    document.getElementById("loginUser").style.display = "block";

  }


  document.getElementById("logout").addEventListener("click",function(){
    currUser = 0;
    document.getElementById("User").textContent = "Account";
    document.getElementById("logoutUser").style.display = "block";
    document.getElementById("loginUser").style.display = "none";
    localStorage.setItem("loginUser", JSON.stringify(currUser));
    window.location.href = "loginpage.html";
  });
}

updateUser();



