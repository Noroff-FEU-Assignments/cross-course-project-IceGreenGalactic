import { fetchJackets, createHTML } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { displayMessage } from "./utils/errorMessage.js";


document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

function createCartItem (cartItem, jacket, cartContainer, favourites){
  const cart = getCartFromLocalStorage();
  const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("Cart-Bergolos");

          const imgLink = document.createElement("a");
          imgLink.href= `/info.html?id=${jacket.id}`;

          const img = document.createElement("img");
          img.src = jacket.image;
          img.alt = jacket.description;

          imgLink.appendChild(img);


          const priceDiv = document.createElement("div");
          const amountDiv = document.createElement("div");
          const totalDiv = document.createElement("div");
          const titleAndTagsDiv = document.createElement("div");
          const sizeDiv = document.createElement ("div");


          const titleH3 = document.createElement("h4");
          const tagsH3 = document.createElement("h4");
          const priceP = document.createElement("p");
          const amountH4 = document.createElement("h4");
          const totalP = document.createElement("p");
          const sizeP = document.createElement ("p");


          titleH3.textContent = jacket.title;
          tagsH3.textContent = jacket.tags;

          if (jacket.onSale) {
            priceP.textContent = `$${jacket.discountedPrice}`;
          }else{
            priceP.textContent = `$${jacket.price}`;
          }

          const minusButton = document.createElement("button");
          minusButton.classList.add ("cart-button")
          minusButton.textContent ="-";
          minusButton.addEventListener("click", () =>{
            if(cartItem.quantity>1){
              cartItem.quantity --;
              updateQuantity()
              updateTotalPrice();
              saveCartToLocalStorage(cart);
            }
          });

          const quantitySpan = document.createElement ("span");
          quantitySpan.textContent = cartItem.quantity;

          const plussButton = document.createElement("button");
          plussButton.classList.add ("cart-button")
          plussButton.textContent ="+";
          plussButton.addEventListener("click", () =>{
            if(cartItem.quantity<10){
              cartItem.quantity ++;
              updateQuantity()
              updateTotalPrice();
              saveCartToLocalStorage(cart);
            }
          });

          const removeButton = document.createElement ("button");
          removeButton.classList.add ("cart-button-remove")
          removeButton.textContent = "Remove";
          removeButton.addEventListener("click", () =>{
            removeItemFromCart (cartItem);
          });




          totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
          sizeP.textContent = cartItem.size;

          
        
          amountDiv.classList.add("amount");
          amountH4.textContent = cartItem.quantity;

          priceDiv.appendChild(priceP);
          amountDiv.appendChild(plussButton);
          amountDiv.appendChild(quantitySpan);
          amountDiv.appendChild(minusButton);
          amountDiv.appendChild(removeButton);
          totalDiv.appendChild(totalP);
 
          titleAndTagsDiv.appendChild(titleH3);
          titleAndTagsDiv.appendChild(tagsH3);
          sizeDiv.appendChild(sizeP);


          cartItemDiv.appendChild(imgLink);
          cartItemDiv.appendChild(titleAndTagsDiv);
          cartItemDiv.appendChild(priceDiv);
          cartItemDiv.appendChild(amountDiv);
          cartItemDiv.appendChild(sizeDiv);
          cartItemDiv.appendChild(totalDiv);

          cartContainer.appendChild(cartItemDiv);

          function updateTotalPrice(){
            cartItem.totalPrice=
            parseFloat(jacket.onSale ? jacket.discountedPrice : jacket.price) * cartItem.quantity;
            totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
          }


          function updateQuantity(){
            const cart = getCartFromLocalStorage();
                        quantitySpan.textContent = cartItem.quantity;
                        amountH4.textContent = cartItem.quantity;
                        const index = cart.findIndex((item)=>  item.id === cartItem.id && item.size === cartItem.size);
                        if (index !== -1){
                          cart[index].quantity = cartItem.quantity;
                          saveCartToLocalStorage(cart);
                        }
                        updateTotalPrice();
                    }

                      function removeItemFromCart(cartItem){
                        const index = cart.findIndex((item)=> item.id === cartItem.id && item.size === cartItem.size);
                        if (index !== -1){
                          cart.splice(index,1);
                          saveCartToLocalStorage (cart);
                          cartContainer.removeChild(cartItemDiv);
                        }
                      }
        }





document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.querySelector(".Shoppingbag");
  let cartItems = getCartFromLocalStorage();

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";
      cartItems = getCartFromLocalStorage();
      const jacketList = await fetchJackets(cartContainer);
      const favourites = getExistingFavs();

      if (cartItems.length=== 0){
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "No jackets in cart";
        emptyCartMessage.classList.add("Index__Sale")
        cartContainer.appendChild(emptyCartMessage);
      }else{

      cartItems.forEach((cartItem) => {
        const jacket = jacketList.find((jacketItem) => jacketItem.id === cartItem.id);

        if (jacket) {
          createCartItem( cartItem, jacket, cartContainer, favourites);

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
