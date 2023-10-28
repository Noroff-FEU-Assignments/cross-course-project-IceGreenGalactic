import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { fetchJackets } from "./jacketsList.js";


let quantity = parseInt(localStorage.getItem("quantity")) || 0;
let selectedSize = "";
let sizeSelected = false;
let currentTextIndex = 0;
let jacket;

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

const jacketContainer = document.querySelector(".jacket-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const jacketData = await fetchJackets();
    jacket = jacketData.find((jacket) => jacket.id === parseInt(id, 10));

    if (jacket) {
      document.title = `${jacket.name}`;
      const cart = getCartFromLocalStorage();
      const cartItem = cart.find((item) => item.id === jacket.id && item.size === selectedSize);

      createHTML(jacket, cartItem);
    } else {
      if (window.location.pathname.includes("info.html")) {
        const errorMessage = "Jacket not found";
        const messageType = "Error";
        displayMessage(messageType, errorMessage, ".jacket-container");
      }
    }
  } catch (error) {
    console.error(error);
  }
});

const buttonTexts = ["Add to cart", "Added!"];

const storedButtonText = localStorage.getItem("addToCartButtonText");
if (storedButtonText && buttonTexts.includes(storedButtonText)) {
  currentTextIndex = buttonTexts.indexOf(storedButtonText);
}

export function createHTML(info, cartItem) {
  console.log("Creating HTML for jacket with info:", info);
  const image = info.images[0].src;
  const altText = info.images[0].alt;
  const price = (parseInt(info.prices.regular_price, 10) / 100).toLocaleString('nb-NO', {
    style: "currency",
    currency: "NOK",
  });
  const discountedPrice = (parseInt(info.prices.sale_price, 10) / 100).toLocaleString('nb-NO', {
    style: "currency",
    currency: "NOK",
  });

  jacketContainer.innerHTML += `
    <div class="Jacket_info ">
      <div >
        <h1 >${info.name}</h1>
        <h2>  ${info.categories[0].name}</h2>
        <h3>${info.description}</h3>
        ${
          info.on_sale
            ? ` <p class="info_Price_original"> ${price}  </p>
               <p class = "info_onSale_price">  ${discountedPrice}</p>`
            : `<p class= "info_Price "> ${price}</p>`
        }
        <div class="Size-button"></div>
        <button class="Continue_button addedToCart"> Add to cart </button>
        <button class="cart_button"> </button>
        <button class="info-button-remove" style="display: none;"><i class="far fa-trash-can"></i></button> 
      </div >
      <img  src="${image}" alt="${altText}" />
    </div>`;

  const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
  let selectedSizeButton = null;

  if (info.attributes) {
    const sizeAttribute = info.attributes.find((attr) => attr.name === "size");

    if (sizeAttribute && sizeAttribute.terms) {
      const sizes = sizeAttribute.terms.map((term) => term.name);
      sizeAttribute.terms.forEach((term) => {
        const sizeButton = document.createElement("button");
        sizeButton.textContent = term.name;
        sizeButton.className = "Size-button";

        sizeButton.addEventListener("click", () => {
          if (selectedSizeButton) {
            selectedSizeButton.classList.remove("clicked");
          }
          sizeButton.classList.toggle("clicked");
          selectedSizeButton = sizeButton;
          selectedSize = term.name;
          sizeSelected = true;
          resetButtonText();

          const cart = getCartFromLocalStorage();
          const cartItem = cart.find ((item)=> item.id === jacket.id && item.size === selectedSize);
          itemQuantity = cartItem ? cartItem.quantity : 0;
          updateButtonText(jacket, selectedSize);
        });

        sizeButtonsContainer.appendChild(sizeButton);
      });
    }
  }

  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const removeButton = jacketContainer.querySelector(".info-button-remove");
  const cart = getCartFromLocalStorage();

  if (cartItem) {
    currentTextIndex = 1;

    addToCartButton.textContent = `Added ${cartItem.quantity}`;
    addToCartButton.style.display = "block";
    cartButton.style.display = "block";
    removeButton.style.display = "block";
  } else {
    currentTextIndex = 0;
    addToCartButton.style.display = "block";
    cartButton.style.display = "none";
    removeButton.style.display = "none";
  }

  addToCartButton.addEventListener("click", () => {

    if (sizeSelected){
       addToCart(info, selectedSize);
      currentTextIndex = 1;
      updateButtonText(jacket, selectedSize);
   
    }
  });

  cartButton.textContent = "Go to cart";
  cartButton.className = "Continue_button cart_button";
  cartButton.addEventListener("click", () => {
    window.location.href = "Checkout/Cart.html";
  });

  removeButton.addEventListener("click", () => {
    removeFromCart(info, selectedSize);
    updateButtonText(jacket, selectedSize);
  });
}
let itemQuantity = 0;
export function addToCart(jacket, selectedSize) {
  const cart = getCartFromLocalStorage();
  let itemIndex = cart.findIndex((item) => item.id === jacket.id && item.size === selectedSize);
  let cartItem;
  console.log("Adding item to the cart:", jacket, selectedSize);
  
  if (itemIndex !== -1){
    cartItem = cart[itemIndex];
    cartItem.quantity += 1;
    itemQuantity = cartItem.quantity
   cartItem.totalPrice += jacket.prices.price;
    
    saveCartToLocalStorage(cart);
    updateButtonText(jacket, selectedSize);
  } else {
    const itemPrice = jacket.on_sale ? parseFloat(jacket.prices.sale_price) : parseFloat(jacket.prices.regular_price);

    cart.push({
      id: jacket.id,
      name: jacket.name,
      price: jacket.prices.price,
      image: jacket.images[0].src,
      on_sale: jacket.on_sale,
      size: selectedSize,
      quantity: 1,
      itemPrice: itemPrice,
      totalPrice: itemPrice,
    });
    itemIndex = cart.length - 1;
    cartItem = cart[itemIndex];
    itemQuantity = 1;
  }

  cartItem.totalPrice = cartItem.itemPrice * cartItem.quantity;
  saveCartToLocalStorage(cart);
  updateButtonText(jacket, selectedSize);
  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const removeButton = jacketContainer.querySelector(".info-button-remove");

  addToCartButton.style.display ="block";
  cartButton.style.display = "block";
  removeButton.style.display = "block";

  updateButtonText(jacket, selectedSize);
}

function updateButtonText(jacket, selectedSize) {
  const cart = getCartFromLocalStorage ();
  const cartItem = cart.find (item => item.id === jacket.id && item.size === selectedSize)
  console.log("Updating button text with cart item:", itemQuantity);
  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const removeButton = jacketContainer.querySelector(".info-button-remove");

  if (cartItem){
   

    addToCartButton.textContent = `Added ${itemQuantity}`;
    addToCartButton.style.display ="block";
    cartButton.style.display = "block";
    removeButton.style.display = "block";

    const quantitytext = addToCartButton.textContent;
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = itemQuantity;
    quantitySpan.classList.add ("info-quantity");
    addToCartButton.innerHTML = quantitytext.replace(itemQuantity, quantitySpan.outerHTML);
    

    console.log ("itemQuantity", itemQuantity)
   
  } else {
    addToCartButton.textContent = "Add to cart";
    addToCartButton.style.display="block";
    cartButton.style.display= "none";
    removeButton.style.display = "none";
  }
  localStorage.setItem("addToCartButtonText", addToCartButton.textContent);
}

function resetButtonText (){
  const addToCartButton = jacketContainer.querySelector (".addedToCart");
  addToCartButton.textContent = "Add to cart";
  currentTextIndex = 0;
  localStorage.setItem ("addToCartButtonText", addToCartButton.textContent)
}

function removeFromCart(jacket, selectedSize){
  const cart = getCartFromLocalStorage();
  let itemIndex = cart.findIndex((item) => item.id === jacket.id && item.size === selectedSize);

  if (itemIndex !== -1){
    cart.splice(itemIndex, 1);
    saveCartToLocalStorage(cart);
  }
  updateButtonText(jacket, selectedSize);
}

export function saveCartToLocalStorage(cart) {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
export function getCartFromLocalStorage() {
  try {
    const cart = localStorage.getItem("shoppingCart");
    return Array.isArray(cart) ? cart : JSON.parse (cart) || [];
  } catch (error) {
    return [];
  }
}

fetchJackets();
