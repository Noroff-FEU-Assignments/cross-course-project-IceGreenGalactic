import { fetchJackets, createHTML } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { displayMessage } from "./utils/errorMessage.js";


document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

function createCartItem (cartItem, jacket){
    const itemTotal= cartItem.quantity * (jacket.onSale ? jacket.discountedPrice : jacket.price);
    
  const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("Shoppingbag_Summary");
          const textContainer = document.createElement("div");

          
          function formatPrice(price) {
            return (price / 100).toLocaleString("nb-NO", {
              style: "currency",
              currency: "NOK",
            });
          }
    
  const img = document.createElement("img");
  img.src = jacket.images[0].src;
  img.alt = jacket.images[0].alt;


          const titleH2 = document.createElement("h2");
          const priceH2 = document.createElement("h2");
          const amountP = document.createElement("p");
          const totalH2 = document.createElement("h2");
          const sizeP = document.createElement ("p");
          

          titleH2.textContent = jacket.title;

          if (jacket.on_sale) {
            priceH2.textContent = formatPrice (jacket.prices.sale_price);
          }else{
            priceH2.textContent = formatPrice(jacket.prices.regular_price);
          }

    
        



          totalH2.textContent = formatPrice (cartItem.totalPrice);
          sizeP.textContent = cartItem.size;

          
          amountP.textContent = `Amount: ${cartItem.quantity}`;


          
          textContainer.appendChild(titleH2);
          textContainer.appendChild(priceH2);
          textContainer.appendChild(sizeP);
          textContainer.appendChild(amountP);
          textContainer.appendChild(totalH2);
          cartItemDiv.appendChild(img);
          cartItemDiv.appendChild(textContainer);

          return cartItemDiv;

    }

    
document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.querySelector(".Shoppingbag_Summary");
  let cartItems = getCartFromLocalStorage();
  

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";
     
      const jacketList = await fetchJackets(cartContainer);
      if (cartItems.length=== 0){
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "No jackets in cart";
        emptyCartMessage.classList.add("Index__Sale")
        cartContainer.appendChild(emptyCartMessage);
      }else{

      cartItems.forEach((cartItem) => {
        const jacket = jacketList.find((jacketItem) => jacketItem.id === cartItem.id);

        if (jacket) {
          cartContainer.appendChild(createCartItem (cartItem, jacket));

        }else{
          const errorMessage = "jacket not found in the cart";
          const messageType = "Error";
          displayMessage (messageType, errorMessage, cartContainer)
        }
      });
    }
   
   
    }
  } catch (error) {
    console.error(error);
  }
});


// const summaryDiv = document.createElement("div")
//           summaryDiv.classList.add ("Checkout_Summary")
//           const totalPrice = document.createElement("p")
//           totalPrice.textContent = `Total Price: $${cartItem.itemTotal}`
//           summaryDiv.appendChild(totalPrice);
//           textContainer.appendChild(summaryDiv)