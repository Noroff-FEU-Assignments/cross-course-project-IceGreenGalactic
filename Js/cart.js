import {fetchJackets,createHTML} from "./info.js";
import { displayMessage } from "./utils/errorMessage.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { getExistingFavs, toggleFavorite } from "./utils/favFunctions.js";
import {addToCart, getCartFromLocalStorage, saveCartToLocalStorage } from "./info.js";

document.addEventListener("DOMContentLoaded", async()=>{

const cartContainer = document.querySelector(".Cart");
const shopingBag = document.querySelector (".Shoppingbag");

  try{
    if (cartContainer){
    const jacketList = await fetchJackets(cartContainer);
    const favourites = getExistingFavs();
    const cartItems = getCartFromLocalStorage();
    cartItems.forEach( async (cartItem)=>{
      const jacket = jacketList.find ((jacketItem)=> jacketItem.id === cartItem.id);
      if (jacket){
      createHTML(jacket,shopingBag, favourites);
      const jacketToAdd ={
        title:jacket.title,
        color:jacket.color,
        price: jacket.price, 
      };
  }
});
  

    }


window.addEventListener("load", () =>{
  getCartFromLocalStorage();
});
} catch (error){
  console.error (error);
  // const errorMessage = "failed to fetch data. Please try again later";
  // const messageType = "Error"
  // displayMessage(messageType, errorMessage, cartContainer)
}

});