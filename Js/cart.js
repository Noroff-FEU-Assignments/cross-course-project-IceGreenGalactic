
import { fetchJackets,createHTML } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async()=>{
    NavbarClosing();
});


document.addEventListener("DOMContentLoaded", async()=>{
const cartContainer = document.querySelector(".Shoppingbag");
// const shoppingBag = document.querySelector (".Cart-Bergolos");

  try{
    if (cartContainer){
    const cartItems = getCartFromLocalStorage();
    const jacketList = await fetchJackets(cartContainer);
    const favourites = getExistingFavs();
    
    

    cartContainer.innerHTML="";

    cartItems.forEach( (cartItem)=>{
      const jacket = jacketList.find ((jacketItem)=> jacketItem.id === cartItem.id);

      
      if (jacket){
      createHTML(jacket,cartContainer, favourites);

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add ("Cart-Bergolos");
      
      const img = document.createElement("img");
      img.src= jacket.image;
      img.alt = jacket.description;
      

      const TextContainer = document.createElement ("div");
      
      const titleH2 = document.createElement ("h2");
      const descriptionH3= document.createElement ("h3");
      const color= document.createElement("h2")
      titleH2.textContent = jacket.title;
      descriptionH3.textContent = jacket.description;
      color.textContent = jacket.baseColor;
      TextContainer.appendChild(titleH2);
      TextContainer.appendChild(descriptionH3);
      TextContainer.appendChild(color);

      const priceDiv = document.createElement("div");

      const priceP = document.createElement("p");
      const amountH4 = document.createElement("h4");
      priceP.textContent = `$${jacket.price}`;
      amountH4.classList.add ("amount");
      amountH4.classList.add (`1`);

      priceDiv.appendChild(priceP);
      priceDiv.appendChild(amountH4);

     
      cartItemDiv.appendChild(img);
       cartItemDiv.appendChild(TextContainer);
       cartItemDiv.appendChild(priceDiv)

      cartContainer.appendChild(cartItemDiv)
      }
      });
  }


window.addEventListener("load", () =>{
});
} catch (error){
  console.error (error);
}

});