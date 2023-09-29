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
});

const buttonTexts = ["Add to cart", "Added!"];
let currentTextIndex = 0;

const storedButtonText = localStorage.getItem("addToCartButtonText");
if (storedButtonText) {
  currentTextIndex = buttonTexts.indexOf(storedButtonText);
}


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
                                      <button class="Remove_button"> Remove item </button>
                                    </div >
                                         <img  src="${info.image}" alt="${
    info.description
  }" />
                                         </div>`;

  const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
  let selectedSizeButton = null;
  let selectedSize ="";

  if (info.sizes) {
    info.sizes.forEach((size) => {
      const sizeButton = document.createElement("Button");
      sizeButton.textContent = size;
      sizeButton.className = "Size-button";

      let selectedSize ="";

      sizeButton.addEventListener("click", () => {
        if (selectedSizeButton) {
          selectedSizeButton.classList.remove("clicked");
        }
        sizeButton.classList.toggle("clicked");
        selectedSizeButton = sizeButton;
        selectedSize = size;
      });

      sizeButtonsContainer.appendChild(sizeButton);
    });
  }

  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const removeButton = jacketContainer.querySelector(".Remove_button");
  const storedButtonText = localStorage.getItem("addToCartButtonText");

  const cart = getCartFromLocalStorage();
  const isJacketInCart = cart.some((item) => item.id === info.id);

  if (isJacketInCart && storedButtonText && storedButtonText === "Added!") {
    currentTextIndex = 1;
    addToCartButton.style.display = "block";
    removeButton.style.display = "block";
  } else {
    currentTextIndex = 0;
    removeButton.style.display = "none";
  }

  addToCartButton.textContent = buttonTexts[currentTextIndex];

  addToCartButton.addEventListener("click", () => {
    if (currentTextIndex === 0) {
      currentTextIndex = 1;
      const selectedSizeButton = jacketContainer.querySelector(".Size-button .clicked");
      const selectedSize = selectedSizeButton ? selectedSizeButton.textContent: "";
      addToCart(info, selectedSize);
      updateButtonText();
      addToCartButton.style.display = "block";
      removeButton.style.display = "block";
    } else {
      addToCart(info, selectedSize);
      currentTextIndex = 0;
      addToCartButton.textContent = buttonTexts[currentTextIndex];
     
    }
  });
  removeButton.textContent = "Go to cart";
  removeButton.className = "Continue_button Remove_button";
  removeButton.addEventListener("click", () => {
    window.location.href="Checkout/Cart.html"
  });

  function updateButtonText() {
    addToCartButton.textContent = buttonTexts[currentTextIndex];
    if (currentTextIndex === 0) {
      removeButton.style.display = "none";
    } else {
      removeButton.style.display = "block";
    }
    localStorage.setItem("addToCartButtonText", buttonTexts[currentTextIndex]);
  }
}

export function addToCart(jacket, selectedSize) {
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.findIndex((item) => item.id === jacket.id);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity +=1;
    cart[itemIndex].totalPrice += jacket.price;
    cart[itemIndex].size = selectedSize;
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
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

export function removeFromCart(jacket) {
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === jacket.id);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    saveCartToLocalStorage(cart);
  }
}

export function saveCartToLocalStorage(cart) {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
export function getCartFromLocalStorage() {
  const cart = localStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
}
fetchJackets();
