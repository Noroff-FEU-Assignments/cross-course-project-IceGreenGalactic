import { fetchJackets, createHTML } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { displayMessage } from "./utils/errorMessage.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.querySelector(".Shoppingbag");
  // const shoppingBag = document.querySelector (".Cart-Bergolos");

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";
      const cartItems = getCartFromLocalStorage();
      const jacketList = await fetchJackets(cartContainer);
      const favourites = getExistingFavs();

      if (cartItems.length=== 0){
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "No jackets in cart";
        emptyCartMessage.classList.add("Index__Sale")
        cartContainer.appendChild(emptyCartMessage);
      }else{

      cartItems.forEach((cartItem) => {
        const jacket = jacketList.find(
          (jacketItem) => jacketItem.id === cartItem.id
        );

        if (jacket) {
          createHTML(jacket, cartContainer, favourites);

          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("Cart-Bergolos");

          const imgLink = document.createElement("a");
          imgLink.href= `/info.html?id=${jacket.id}`;
          // imgLink.target ="_blank";

          const img = document.createElement("img");
          img.src = jacket.image;
          img.alt = jacket.description;

          imgLink.appendChild(img);


          const priceDiv = document.createElement("div");
          const amountDiv = document.createElement("div");
          const totalDiv = document.createElement("div");
          const colorDiv = document.createElement("div");
          const titleAndTagsDiv = document.createElement("div");


          const titleH3 = document.createElement("h4");
          const tagsH3 = document.createElement("h4");
          const priceP = document.createElement("p");
          const amountH4 = document.createElement("h4");
          const totalP = document.createElement("p");
          const color = document.createElement("h4");
          const sizeP = document.createElement ("p");


          titleH3.textContent = jacket.title;
          tagsH3.textContent = jacket.tags;
          if (jacket.onSale) {
            priceP.textContent = `$${jacket.discountedPrice}`;
            cartItem.totalPrice = parseFloat(jacket.discountedPrice) * cartItem.quantity;
          }else{
            priceP.textContent = `$${jacket.price}`;
            cartItem.totalPrice = parseFloat(jacket.price)* cartItem.quantity;
          }
          amountH4.classList.add("amount");
          amountH4.textContent = cartItem.quantity;
          color.textContent = jacket.baseColor;
          sizeP.textContent = `size: ${cartItem.size}`;


          priceDiv.appendChild(priceP);
          amountDiv.appendChild(amountH4);
          colorDiv.appendChild(color);
          titleAndTagsDiv.appendChild(titleH3);
          titleAndTagsDiv.appendChild(tagsH3)

          totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;

          totalDiv.appendChild(totalP);

          cartItemDiv.appendChild(imgLink);
          cartItemDiv.appendChild(titleAndTagsDiv);
          cartItemDiv.appendChild(priceDiv);
          cartItemDiv.appendChild(amountDiv);
          cartItemDiv.appendChild(colorDiv);
          cartItemDiv.appendChild(totalDiv);

          cartContainer.appendChild(cartItemDiv);
          

        }else{
          const errorMessage = "jacket not found in the cart";
          const messageType = "Error";
          displayMessage (messageType, errorMessage, cartContainer)
        }
      });
    }
  }
    window.addEventListener("load", () => {});
  } catch (error) {
    console.error(error);
  }
});
