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

          // const minusButton = document.createElement("button");
          // minusButton.classList.add ("cart-button")
          // minusButton.textContent ="-";
          // minusButton.addEventListener("click", () =>{
          //     cartItem.quantity --;
          //     updateQuantity();
          //     updateTotalPrice(cartItem, jacket);
          //     saveCartToLocalStorage(cart);
          //     updateCartandSave();
          //     updateCartSummary(cart, checkoutSummarySection);

          //   });

          // const quantitySpan = document.createElement ("span");
          // quantitySpan.classList.add ("cart-quantity")
          // quantitySpan.textContent = cartItem.quantity;

          // const plussButton = document.createElement("button");
          // plussButton.classList.add ("cart-button")
          // plussButton.textContent ="+";
          // plussButton.addEventListener("click", () =>{
          //   if(cartItem.quantity<10){
          //     cartItem.quantity ++;
          //     updateQuantity()
          //     updateTotalPrice(cartItem, jacket);
          //     saveCartToLocalStorage(cart);
          //     updateCartandSave();
          //     updateCartSummary(cart);
          //   }
          // });
          
          const quantityStepper = document.createElement("input");
          quantityStepper.type ="number";
          quantityStepper.value= cartItem.quantity;
          quantityStepper.min =1;
          quantityStepper.max = 20;
          quantityStepper.classList.add ("cart-quantity");

          quantityStepper.addEventListener ("input", () => {
            const newQuantity = parseInt (quantityStepper.value);
            if (!isNaN (newQuantity)&& newQuantity >= 1 && newQuantity <=20){
              cartItem.quantity = newQuantity;
              updateTotalPrice(cartItem, jacket);
              saveCartToLocalStorage(cart);
              updateCartandSave();
              updateCartSummary(cart);
            }
          });
          

          const removeButton = document.createElement ("button");
          removeButton.classList.add ("cart-button-remove")
          removeButton.innerHTML = '<i class="far fa-trash-can"></i>'
          removeButton.addEventListener("click", () =>{
            removeItemFromCart (cartItem, cartContainer);
          });




          totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
          sizeP.textContent = cartItem.size;

          
        
          amountDiv.classList.add("amount");
          amountH4.textContent = cartItem.quantity;

          priceDiv.appendChild(priceP);
          amountDiv.appendChild(quantityStepper);
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

          function updateTotalPrice( cartItem, jacket){
            cartItem.totalPrice =
            parseFloat(jacket.onSale ? jacket.discountedPrice : jacket.price) *
            cartItem.quantity
            totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
          }

          function updateCartandSave(){
            const index = cart.findIndex((item)=> item.id === cartItem.id && item.size === cartItem.size);
            if (index !== -1){
              cart[index] = cartItem;
              saveCartToLocalStorage(cart);
            }
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
                        updateTotalPrice(cartItem, jacket);
                    }
                    

                      function removeItemFromCart(cartItem){
                        const indexesToRemove =[]

                        cart.forEach ((item, index)=> {
                          if (item.id === cartItem.id && item.size === cartItem.size){
                            indexesToRemove.push(index);
                          }
                        });
                        console.log (`Ìndexes to remove:`, indexesToRemove);
                        for (let i = indexesToRemove.length -1; i>= 0; i--){
                        const index = indexesToRemove[i];
                        cart.splice (index, 1);
                        }
                        saveCartToLocalStorage(cart);

                        indexesToRemove.forEach((index) => {
                          const cartItemDiv = cartContainer.querySelector (`.Cart-Bergolos:nth-child(${index + 1})`);
                          console.log('Removing cartItemDiv:', cartItemDiv);
                          if (cartItemDiv) {
                            cartContainer.removeChild(cartItemDiv)
                          }
                        });
                        saveCartToLocalStorage(cart)
                        updateCartSummary(cart);
                        
                        updateTotalPrice(cartItem, jacket);
                      }

                    }

 
document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.querySelector(".Shoppingbag");
  let cartItems = getCartFromLocalStorage();
  

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";
     
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
   
    const goToCheckoutButton = document.createElement ("button");
    goToCheckoutButton.textContent = "Checkout";
    goToCheckoutButton.className="Continue_button "
    goToCheckoutButton.addEventListener ("click", () => {
      window.location.href = "/Checkout/checkout.html"
    });
    cartContainer.appendChild(goToCheckoutButton);

    let orderTotal= 0;
    cartItems.forEach((cartItem) =>{
      orderTotal += cartItem.totalPrice;
    });
    
    
    const orderTotalElement = document.createElement("p");
    orderTotalElement.textContent= `Total: $${orderTotal.toFixed(2)}`;
    orderTotalElement.classList.add("Cart_Total");

    checkoutSummarySection.insertBefore(orderTotalElement, goToCheckoutButton);

    updateCartSummary(cartItems, checkoutSummarySection);
    updateCartSummary(cartItems, shoppingCartSection);
    }
  } catch (error) {
    console.error(error);
  }
});


const cartSummarySection = document.querySelector(".Cart_Summary");
const shoppingCartSection = document.querySelector(".Shoppingbag");

function updateCartSummary(cartItems, targetElement){
  let subtotal = 0;
  let totalSavings = 0;
  let shipping = 0;
  let inklTax = 0;
  let orderTotal = 0;

  cartItems.forEach((cartItem)=>{
    subtotal += cartItem.totalPrice;
    if (cartItem.onSale){

    
  totalSavings += (cartItem.price - cartItem.discountedPrice) * cartItem.quantity
}

   inklTax += cartItem.totalPrice * 0.5;
  });

  if (subtotal < 500) {
    shipping= 10; 
    orderTotal = subtotal + shipping
  }else{
    shipping = "Free shipping"
    orderTotal=subtotal;
  } 
 

  const subtotalElement = cartSummarySection.querySelector(`.subtotal`);
  const totalSavingsElement = cartSummarySection.querySelector (`.total-savings`);
  const shippingElement = cartSummarySection.querySelector('.shipping');
  const inklTaxElement = cartSummarySection.querySelector (`.inkl-tax`);
  const orderTotalElement = cartSummarySection.querySelector (`.order-total-price`);

  
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`
  if (totalSavingsElement) totalSavingsElement.textContent = `$${totalSavings.toFixed(2)}`
  if (shippingElement) shippingElement.textContent = shipping;
  if (inklTaxElement) inklTaxElement.textContent = `$${inklTax.toFixed(2)}`
  if (orderTotalElement) orderTotalElement.textContent =`$${ orderTotal.toFixed(2)}`;
  if(targetElement){
    const subtotalElement = targetElement.querySelector(".subtotal");
    if (subtotalElement) subtotalElement.textContent = `total: $${subtotal.toFixed(2)}`;
  }
  
}
const checkoutSummarySection = document.querySelector (".Shoppingbag");
const cartItems = getCartFromLocalStorage();
updateCartSummary(cartItems, checkoutSummarySection);
updateCartSummary(cartItems, shoppingCartSection)