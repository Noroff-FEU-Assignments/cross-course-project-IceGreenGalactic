import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";


const jacketContainer = document.querySelector(".jacket-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = id? "https://api.noroff.dev/api/v1/rainy-days/" + id: "https://api.noroff.dev/api/v1/rainy-days/";

const buttonTexts =["Add to cart", "Added!", "Remove item", "Removed from cart"];
let currentTextIndex =0;


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
                                    </div >
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` ;

const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
let selectedSizeButton = null;

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


    const addToCartButton = jacketContainer.querySelector(".addedToCart");

    addToCartButton.textContent = buttonTexts[currentTextIndex];

    addToCartButton.addEventListener ("click", () => {
      addToCart(info);
      currentTextIndex = (currentTextIndex + 1)% buttonTexts.length;
      updateButtonText();
    });

    function updateButtonText(){
      addToCartButton.textContent=buttonTexts[currentTextIndex];
      if (currentTextIndex === 1 || currentTextIndex===3){
        setTimeout(()=>{
          currentTextIndex = (currentTextIndex +1) %4;;
          updateButtonText();
        }, 3000);
     
    }
  }}



  export function addToCart(jacket, container){
    const cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex((item) => item.id === jacket.id);
    if (itemIndex !== -1){
      cart.splice(itemIndex, 1);
    }else{
    cart.push(jacket);
   
  } 
  saveCartToLocalStorage(cart)
  
  }
  export function saveCartToLocalStorage(cart){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("shoppingCart");
    return cart ? JSON.parse(cart) :[];
  } fetchJackets()