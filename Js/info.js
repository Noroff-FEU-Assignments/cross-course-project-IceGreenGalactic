import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { fetchJackets } from "./jacketsList.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});


const jacketContainer = document.querySelector(".jacket-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async()=>{
  try{
  const jacketData = await fetchJackets();
  const jacketList = jacketData.find((jacket)=> jacket.id === id);
  if (jacketList){
    createHTML(jacketList);
    
  }else{
    if(window.location.pathname.includes("info.html")){
    const errorMessage ="jacket not found";
    const messageType ="Error";
    displayMessage(messageType, errorMessage, ".jacket-container");
  }
}
}catch (error){
  console.error(error);
}
});

const buttonTexts = ["Add to cart", "Added!"];
let currentTextIndex = 0;

const storedButtonText = localStorage.getItem("addToCartButtonText");
if (storedButtonText && buttonTexts.includes(storedButtonText)) {
  currentTextIndex = buttonTexts.indexOf(storedButtonText);
}
let quantity = parseInt(localStorage.getItem("quantity")) || 0; 
let selectedSize ="";
let sizeSelected = false; 

export function createHTML(info) {
  
  let cssClass = "far";
  jacketContainer.innerHTML += `
                              <div class="Jacket_info ">
                               <div >
                                 <h1 >${info.title}</h1>
                                  <h2> Color: ${info.baseColor}</h2>
                                    <h3>${info.description}</h3>
                                    
                                    ${
                                      info.onSale
                                        ? ` <p class="info_Price_original"> $${info.price}  </p>
                                      <p class = "info_onSale_price">  $${info.discountedPrice}</p>
                                      `
                                        : `<p class= "info_Price "> $${info.price}</p>`
                                    }
                                     <div class="Size-button"></div>
                                      <button class="Continue_button addedToCart"> Add to cart </button>
                                      <button class="cart_button"> </button>
                                    </div >
                                         <img  src="${info.image}" alt="${ info.description}" />
                                         </div>`;

  const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
  let selectedSizeButton = null;

  if (info.sizes) {
    info.sizes.forEach((size) => {
      const sizeButton = document.createElement("Button");
      sizeButton.textContent = size;
      sizeButton.className = "Size-button";

      sizeButton.addEventListener("click", () => {
        if (selectedSizeButton) {
          selectedSizeButton.classList.remove("clicked");
        }
        sizeButton.classList.toggle("clicked");
        selectedSizeButton = sizeButton;
        selectedSize = size;
        sizeSelected = true;
        resetButtonText();
        updateButtonText();
      });

      sizeButtonsContainer.appendChild(sizeButton);
    });
  }

  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");

  const cart = getCartFromLocalStorage();
  const cartItem = cart.find((item)=> item.id === info.id && item.size === selectedSize);

    
  if (cartItem) {
    currentTextIndex = 1;

    addToCartButton.textContent = `Added (${cartItem.quantity})`;
    addToCartButton.style.display = "block";
    cartButton.style.display = "block";
  } else {
    currentTextIndex = 0;
    addToCartButton.style.display ="block"
    cartButton.style.display = "none";
  }



  addToCartButton.addEventListener("click", () => {
    if (sizeSelected){
    if (currentTextIndex === 0) {
      currentTextIndex = 1;
      // const selectedSizeButton = jacketContainer.querySelector(".Size-button .clicked");
      // const selectedSize = selectedSizeButton ? selectedSizeButton.textContent: "";
      addToCart(info, selectedSize);
    }else if (currentTextIndex === 1){
    //   quantity += 1;
    //   updateButtonText();
    //   addToCartButton.style.display = "block";
    //   cartButton.style.display = "block";
    // } else  {
      addToCart(info, selectedSize);
    }
    updateButtonText();
    }
  });


  cartButton.textContent = "Go to cart";
  cartButton.className = "Continue_button cart_button";
  cartButton.addEventListener("click", () => {
    window.location.href="Checkout/Cart.html"
  });
}


function updateButtonText() {
  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const cart = getCartFromLocalStorage();
  const cartItem = cart.find((item)=> item.id === id && item.size === selectedSize);

  if (cartItem){
    const itemQuantity = cartItem.quantity

    addToCartButton.textContent = `Added ${itemQuantity}`;
    addToCartButton.style.display ="block";
    cartButton.style.display = "block";
    
    const quantitytext = addToCartButton.textContent;
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = itemQuantity;
    quantitySpan.classList.add ("cart-quantity");
    addToCartButton.innerHTML = quantitytext.replace(itemQuantity, quantitySpan.outerHTML);
    
  }else{
    addToCartButton.textContent = "Add to cart";
    addToCartButton.style.display="block";
    cartButton.style.display= "none";
  }
  localStorage.setItem("addToCartButtonText", addToCartButton.textContent);
}
  function resetButtonText (){
    const addToCartButton = jacketContainer.querySelector (".addedToCart");
    addToCartButton.textContent = "Add to cart";
    currentTextIndex = 0;
    localStorage.setItem ("addToCartButtonText", addToCartButton.textContent)
  }

  

export function addToCart(jacket, selectedSize) {
  const cart = getCartFromLocalStorage();

  const itemIndex = cart.findIndex((item) => item.id === jacket.id && item.size === selectedSize);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity +=1;
    cart[itemIndex].totalPrice += jacket.price;
  }else{
  cart.push({
    id: jacket.id,
    title: jacket.title,
    price: jacket.price,
    image: jacket.image,
    onSale: jacket.onSale,
    size: selectedSize,
    quantity: 1,
    totalPrice: jacket.price
  });
}
  saveCartToLocalStorage(cart);

  incrementQuantity(jacket, selectedSize);
  updateButtonText();
}

function incrementQuantity(jacket,selectedSize){
  let quantity = parseInt(localStorage.getItem("quantity")) || 0;
  quantity += 1;
  localStorage.setItem("quantity", JSON.stringify(quantity));
}


export function saveCartToLocalStorage(cart) {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
export function getCartFromLocalStorage() {
  try{
  const cart = localStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
}catch (error){
  return[];
}
}
fetchJackets();