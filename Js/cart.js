
import { fetchJackets,createHTML } from "./jacketsList.js";
import { displayMessage } from "./utils/errorMessage.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { getExistingFavs, toggleFavorite } from "./utils/favFunctions.js";
import {addToCart, getCartFromLocalStorage, saveCartToLocalStorage } from "./info.js";

document.addEventListener("DOMContentLoaded", async()=>{
const cartContainer = document.querySelector(".Shoppingbag");
// const shoppingBag = document.querySelector (".Cart-Bergolos");

  try{
    if (cartContainer){
    const jacketList = await fetchJackets(cartContainer);
    const favourites = getExistingFavs();
    const cartItems = getCartFromLocalStorage();
    

    cartContainer.innerHTML="";

    cartItems.forEach( async (cartItem)=>{
      const jacket = jacketList.find ((jacketItem)=> jacketItem.id === cartItem.id);
      if (jacket){
      createHTML(jacket,cartContainer, favourites);

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add ("Cart-Bergolos");
      
      const img = document.createElement("img");
      img.src= jacket.image;
      img.alt = jacket.description
      cartItemDiv.appendChild(img);

      const titleDiv = document.createElement ("div");
      titleDiv.classList.add ("Cart-Item-Info");
      const titleH2 = document.createElement ("h2");
      const descriptionH3= document.createElement ("h3");

      titleH2.textContent = jacket.title;
      descriptionH3.textContent = jacket.description;
      titleDiv.appendChild(titleH2);
      titleDiv.appendChild(descriptionH3);
      cartItemDiv.appendChild (titleDiv);

      const priceDiv = document.createElement("div");
      const priceP = document.createElement("p");
      priceP.textContent = `$${jacket.price}`;
      priceDiv.appendChild(priceP);
      cartItemDiv.appendChild(priceDiv);

      const amount = document.createElement("h4");
      amount.classList.add ("Amount");
      amount.textContent = "1";
      cartItemDiv.appendChild (amount); 
      
      cartContainer.appendChild(cartItemDiv)
      }
    });
  }


window.addEventListener("load", () =>{
});
} catch (error){
  console.error (error);
  // const errorMessage = "failed to fetch data. Please try again later";
  // const messageType = "Error"
  // displayMessage(messageType, errorMessage, cartContainer)
}

});