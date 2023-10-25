import { fetchJackets } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { displayMessage } from "./utils/errorMessage.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});


let orderTotal = 0;

function createCartItem(cartItem, jacket, cartContainer, cartItems) {
  const jacketTotalPrice = parseFloat(jacket.on_sale ? jacket.prices.sale_price : jacket.prices.regular_price);
  cartItem.totalPrice = jacketTotalPrice * cartItem.quantity;


cartItems.forEach((cartItem) =>{
  orderTotal += cartItem.totalPrice;
});
console.log ("orderTotal:" , orderTotal);
 
   cartItems.forEach((cartItem)=>{
    orderTotal += cartItem.totalPrice
   })
console.log ("orderTotal:", orderTotal);


  const cart = getCartFromLocalStorage();
  cart.forEach(cartItem =>{
    cartItem.totalPrice = parseFloat(cartItem.totalPrice);
  });
  const cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add("Cart-Bergolos");

  const imgLink = document.createElement("a");
  imgLink.href = `/info.html?id=${jacket.id}`;

  const img = document.createElement("img");
  img.src = jacket.images[0].src 
  img.alt = jacket.images[0].alt
  imgLink.appendChild(img);

  const priceDiv = document.createElement("div");
  const amountDiv = document.createElement("div");
  const totalDiv = document.createElement("div");
  const infoDiv = document.createElement("div");
  const sizeDiv = document.createElement("div");

  const titleH4 = document.createElement("h4");
  const tagsH4 = document.createElement("h4");
  const priceP = document.createElement("p");
  const amountH4 = document.createElement("h4");
  const totalP = document.createElement("p");
  const sizeP = document.createElement("p");

  titleH4.textContent = jacket.name;
  tagsH4.textContent = jacket.tags;

  if (jacket.on_sale) {
    priceP.textContent = `$${jacket.prices.sale_price}`;
  } else {
    priceP.textContent = `$${jacket.prices.price}`;
  }

  const quantityStepper = document.createElement("input");
  quantityStepper.type = "number";
  quantityStepper.value = cartItem.quantity;
  quantityStepper.min = 1;
  quantityStepper.max = 20;
  quantityStepper.classList.add("cart-quantity");

  quantityStepper.addEventListener("input", () => {
    const newQuantity = parseInt(quantityStepper.value);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 20) {
      cartItem.quantity = newQuantity;

      cartItem.totalPrice = jacketTotalPrice * cartItem.quantity;
      // updateTotalPrice(cartItem, jacket);
      saveCartToLocalStorage(cart);
      updateCartandSave();
      updateOrderTotal(cart);
      updateCartSummary(cart);
    }
  });

  const removeButton = document.createElement("button");  
  removeButton.classList.add("cart-button-remove");
  removeButton.innerHTML = '<i class="far fa-trash-can"></i>';
  removeButton.addEventListener("click", () => {
    removeItemFromCart(cartItem, cartContainer);
  });
  const size = jacket.attributes.find((attr)=> attr.name === "size");

  totalP.textContent = `${cartItem.totalPrice.toFixed(2)}`;
  sizeP.textContent = size;

  amountDiv.classList.add("amount");
  amountH4.textContent = cartItem.quantity;

  priceDiv.appendChild(priceP);
  amountDiv.appendChild(quantityStepper);
  amountDiv.appendChild(removeButton);
  totalDiv.appendChild(totalP);

  infoDiv.appendChild(titleH4);
  infoDiv.appendChild(tagsH4);
  sizeDiv.appendChild(sizeP);

  cartItemDiv.appendChild(imgLink);
  cartItemDiv.appendChild(infoDiv);
  cartItemDiv.appendChild(priceDiv);
  cartItemDiv.appendChild(amountDiv);
  cartItemDiv.appendChild(sizeDiv);
  cartItemDiv.appendChild(totalDiv);

  cartContainer.appendChild(cartItemDiv);

  function updateTotalPrice(cartItem, jacket) {
    cartItem.totalPrice =
      parseFloat(jacket.on_sale ? jacket.prices.sale_price : jacket.prices.price) *
      cartItem.quantity;
    totalP.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
  }

  function updateCartandSave() {
    const index = cart.findIndex(
      (item) => item.id === cartItem.id && cartItem.size === cartItem.size
    );
    if (index !== -1) {
      cart[index] = cartItem;
      saveCartToLocalStorage(cart);
    }
  }

  function updateQuantity() {
    const cart = getCartFromLocalStorage();
    quantitySpan.textContent = cartItem.quantity;
    amountH4.textContent = cartItem.quantity;
    const index = cart.findIndex(
      (item) => item.id === cartItem.id && cartItem.size === cartItem.size
    );
    if (index !== -1) {
      cart[index].quantity = cartItem.quantity;
      saveCartToLocalStorage(cart);
    }
    updateTotalPrice(cartItem, jacket);
  }

  function removeItemFromCart(cartItem) {
    const cart = getCartFromLocalStorage();
    const indexesToRemove = [];

    cart.forEach((item, index) => {
      if (item.id === cartItem.id && cartItem.size === cartItem.size) {
        indexesToRemove.push(index);
      }
    });
    for (let i = indexesToRemove.length - 1; i >= 0; i--) {
      const index = indexesToRemove[i];
      cart.splice(index, 1);
    }
    saveCartToLocalStorage(cart);

    indexesToRemove.forEach((index) => {
      const cartItemDiv = cartContainer.querySelector(
        `.Cart-Bergolos:nth-child(${index + 1})`
      );
      if (cartItemDiv) {
        cartContainer.removeChild(cartItemDiv);
      }
    });
    saveCartToLocalStorage(cart);
    updateCartSummary(cart);
    updateOrderTotal(cart);
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

      if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "No jackets in cart";
        emptyCartMessage.classList.add("Index__Sale");
        cartContainer.appendChild(emptyCartMessage);
      } else {
        cartItems.forEach((cartItem) => {const jacket = jacketList.find((jacketItem) => jacketItem.id === cartItem.id);

          if (jacket) {
            createCartItem(cartItem, jacket, cartContainer, favourites, cartItems);
          } else {
            const errorMessage = "jacket not found in the cart";
            const messageType = "Error";
            displayMessage(messageType, errorMessage, cartContainer);
          }
        });
      }

      const goToCheckoutButton = document.createElement("button");
      goToCheckoutButton.textContent = "Checkout";
      goToCheckoutButton.className = "Continue_button ";
      goToCheckoutButton.addEventListener("click", () => {
        window.location.href = "/Checkout/checkout.html";
      });
     

      const toggleButton = document.createElement("button");
      toggleButton.innerHTML = `<i class="fa-solid fa-angles-down"></i>`;
      toggleButton.className = "toggle-summary-button ";
      

      const cartSummarySection = document.querySelector(".Cart_Summary");
      if (cartSummarySection){        
        toggleButton.addEventListener("click", () => {
          cartSummarySection.classList.toggle("cart-summary-visible");

      if (cartSummarySection.classList.contains("cart-summary-visible")) {
        cartSummarySection.appendChild(goToCheckoutButton);
      }else{
        shoppingCartSection.appendChild(goToCheckoutButton);
      }
        });

      }

      let orderTotal = 0;
      cartItems.forEach((cartItem) => {
        orderTotal += cartItem.totalPrice;
      });
      
      console.log("orderTotal:", orderTotal);
      const orderTotalElement = document.createElement("p");
      orderTotalElement.classList.add("Cart_Total");
      orderTotalElement.textContent = `Total: $${orderTotal.toFixed(2)}`;

      const summaryButtonContainer = document.createElement("div");
      summaryButtonContainer.classList.add("cart-summary-container")

     
      summaryButtonContainer.appendChild(orderTotalElement)
      summaryButtonContainer.appendChild(toggleButton);
      
      shoppingCartSection.appendChild(summaryButtonContainer)
      shoppingCartSection.appendChild(goToCheckoutButton);

      updateCartSummary(cartItems, shoppingCartSection);
      
    }
  } catch (error) {
    console.error(error);
  }
});

function updateOrderTotal(cartItems) {
  let orderTotal = 0;
  cartItems.forEach((cartItem) => {
    orderTotal += cartItem.totalPrice;
  });
  const orderTotalElement = document.querySelector(".Cart_Total");
  if (orderTotalElement) {
    console.log("Updating orderTotalElement:", orderTotal.toFixed(2));
    orderTotalElement.textContent = `Total: $${orderTotal.toFixed(2)}`;
  }
}

const cartSummarySection = document.querySelector(".Cart_Summary");
const shoppingCartSection = document.querySelector(".Shoppingbag");

function updateCartSummary(cartItems,cartSummarySection) {
  let subtotal = 0;
  let shipping = 0;
  let inklTax = 0;
  let orderTotal = 0;

  cartItems.forEach((cartItem) => {
    subtotal += cartItem.totalPrice;
    inklTax += cartItem.totalPrice * 0.5;
    
  });
  if (subtotal < 500) {
    shipping = 10;
  } else {
    shipping =0;
    
  }
orderTotal = subtotal + shipping;
console.log("subtotal:", subtotal);
console.log("shipping:", shipping);
console.log("orderTotal:", orderTotal);

  const subtotalElement = cartSummarySection.querySelector(`.subtotal`);
  const shippingElement = cartSummarySection.querySelector(".shipping");
  const inklTaxElement = cartSummarySection.querySelector(`.inkl-tax`);
  const orderTotalElement = cartSummarySection.querySelector(`.order-total-price`);

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingElement) shippingElement.textContent = shipping === 0 ? "Free shipping" : `$${shipping.toFixed(2)}`;
  if (inklTaxElement) inklTaxElement.textContent = `$${inklTax.toFixed(2)}`;
  if (orderTotalElement)orderTotalElement.textContent = `$${orderTotal.toFixed(2)}`;

}
 