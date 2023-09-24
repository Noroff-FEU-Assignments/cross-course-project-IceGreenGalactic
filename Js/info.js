import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async()=>{
    NavbarClosing();
});

const jacketContainer = document.querySelector(".jacket-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = id? "https://api.noroff.dev/api/v1/rainy-days/" + id: "https://api.noroff.dev/api/v1/rainy-days/";

const buttonTexts =["Add to cart", "Added!"];
let currentTextIndex =0;

const storedButtonText = localStorage.getItem("addToCartButtonText");
if (storedButtonText) {
  currentTextIndex = buttonTexts.indexOf(storedButtonText);
}
export async function fetchJackets(container) {

    try{
      showLoader();
    const response = await fetch(url);
    if (!response.ok){
      throw new Error ("failed to fetch data");
    }
   
    const jacketInfo = await response.json();
   
    createHTML(jacketInfo);
    hideLoader();
      }catch(error){
        console.error(error);
        const errorMessage = "failed to fetch data. please try again later";
        const messageType ="Error";
        displayMessage(messageType,errorMessage, ".jacket-container");
       }

    }
    
     
       export function createHTML(info, container){
        let cssClass="far"
        jacketContainer.innerHTML += `
                              <div class="Jacket_info ">
                               <div >
                                 <h1 >${info.title}</h1>
                                  <h2> Color: ${info.baseColor}</h2>
                                    <h3>${info.description}</h3>
                                      <p class="info_Price"> ${info.price} </p>
                                     <div class="Size-button"></div>
                                      <button class="Continue_button addedToCart"> Add to cart </button>
                                      <button class="Remove_button"> Remove item </button>
                                    </div >
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` ;

const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
let selectedSizeButton = null;

if (info.sizes){
info.sizes.forEach((size) =>{
  const sizeButton = document.createElement("Button");
  sizeButton.textContent = size;
  sizeButton.className= "Size-button";

  sizeButton.addEventListener("click", () => {
    if (selectedSizeButton){
      selectedSizeButton.classList.remove("clicked");
    }
   sizeButton.classList.toggle("clicked");
   selectedSizeButton = sizeButton;
  });

      sizeButtonsContainer.appendChild (sizeButton);
    });
  }

    const addToCartButton = jacketContainer.querySelector(".addedToCart");
    const removeButton = jacketContainer.querySelector(".Remove_button");
    const storedButtonText = localStorage.getItem ("addToCartButtonText") 

    const cart = getCartFromLocalStorage();
    const isJacketInCart = cart.some((item)=> item.id === info.id);
    
    if (isJacketInCart && storedButtonText && storedButtonText==="Added!"){
      currentTextIndex =1;
      addToCartButton.style.display ="block";
      removeButton.style.display ="block"
    }else{
      currentTextIndex =0;
      removeButton.style.display ="none"
    }

    addToCartButton.textContent = buttonTexts[currentTextIndex];

    addToCartButton.addEventListener("click", ()=>{
      if (currentTextIndex ===0){
        currentTextIndex =1; 
        addToCart(info);
        updateButtonText();
        addToCartButton.style.display ="block";
        removeButton.style.display ="block";
     
      } else {
        addToCart(jacket);
        currentTextIndex = 0;
        addToCartButton.textContent = buttonTexts[currentTextIndex];
        removeButton.style.display = "none"
      
      }
       });
removeButton.textContent="Remove item"
removeButton.className = "Continue_button Remove_button"
    removeButton.addEventListener("click", () =>{
      removeFromCart (info);
      currentTextIndex =0;
      updateButtonText();
      addToCartButton.style.display = "block";
      removeButton.style.display = "none";
    });

    function updateButtonText() {
      addToCartButton.textContent=buttonTexts[currentTextIndex];
      if (currentTextIndex === 0) {
        removeButton.style.display = "none"
      } else{
        removeButton.style.display ="block"
      } localStorage.setItem("addToCartButtonText", buttonTexts[currentTextIndex]);
    }
  }
      

  export function addToCart(jacket, container){
    const cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex((item) => item.id === jacket.id);
    if (itemIndex !== -1){
      cart.splice(itemIndex, 1);
    }
    cart.push({id: jacket.id, jacket});
  
  saveCartToLocalStorage(cart);
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  } 
  
  export function removeFromCart(jacket){
    const cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === jacket.id);
    if (itemIndex !== -1){
      cart.splice(itemIndex, 1);
      saveCartToLocalStorage(cart);    
    }
  } 

  

  export function saveCartToLocalStorage(cart){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("shoppingCart");
    return cart ? JSON.parse(cart) :[];
  } 
  fetchJackets()