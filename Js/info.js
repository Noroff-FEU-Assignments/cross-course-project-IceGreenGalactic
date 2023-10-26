import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";
import { fetchJackets } from "./jacketsList.js";

let cartItem;
let quantity = parseInt (localStorage.getItem ("quantity")) || 0;
let selectedSize = "";
let sizeSelected = false;
let currentTextIndex = 0;



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
  const jacket = jacketData.find((jacket)=> jacket.id === parseInt(id,10));

  if (jacket){
    document.title = `${jacket.name}`;
    createHTML(jacket);

  
    
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

const storedButtonText = localStorage.getItem("addToCartButtonText");
if (storedButtonText && buttonTexts.includes(storedButtonText)) {
  currentTextIndex = buttonTexts.indexOf(storedButtonText);
}


export function createHTML(info) {
const image = info.images[0].src 
const altText= info.images[0].alt
  const price= (parseInt(info.prices.regular_price, 10) /100).toLocaleString( 'nb-NO',{
  style:`currency`,
  currency: `NOK`

 });
 const discountedPrice= (parseInt(info.prices.sale_price, 10) /100).toLocaleString( 'nb-NO',{
  style:`currency`,
  currency: `NOK`
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
                                         <img  src="${image}" alt="${ altText}" />
                                         </div>`;

  const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
  let selectedSizeButton = null;

  if (info.attributes) {
    const sizeAttribute = info.attributes.find((attr)=> attr.name === "size");

    if(sizeAttribute && sizeAttribute.terms){
      const sizes = sizeAttribute.terms.map (term=> term.name);
      sizeAttribute.terms.forEach((term)=>{
        
      const sizeButton = document.createElement("Button");
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
        updateButtonText(quantity, cartItem);
        
      });
  
      sizeButtonsContainer.appendChild(sizeButton);
    });
  } 
  }   

  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const removeButton =jacketContainer.querySelector(".info-button-remove");
  const cart = getCartFromLocalStorage();
  const cartItem = cart.find((item)=> item.id === info.id && item.size === selectedSize);

  if (cartItem) {
    currentTextIndex = 1;

    addToCartButton.textContent = `Added ${cartItem.quantity}`;
    addToCartButton.style.display = "block";
    cartButton.style.display = "block";
    removeButton.style.display ="block"
  } else {
    currentTextIndex = 0;
    addToCartButton.style.display ="block"
    cartButton.style.display = "none";
    removeButton.style.display ="none"
  }
// Log additional information for debugging
console.log("Button Text: ", cartButton);
console.log("Price: ", price);
console.log("On Sale: ", info.on_sale);
console.log("categories: ", info.categories);
console.log("cartItem", cartItem)
console.log("cartButton:", cartButton);
console.log("selectedSize:", selectedSize);
console.log("Cart Contents:", cart);  
console.log ("quantity", quantity);
console.log("cart content", cart);

  addToCartButton.addEventListener("click", () => {

    if (sizeSelected){
       addToCart(info, selectedSize);
      currentTextIndex = 1;
      updateButtonText (quantity, cartItem);
   
    }
  });


  cartButton.textContent = "Go to cart";
  cartButton.className = "Continue_button cart_button";
  cartButton.addEventListener("click", () => {
    window.location.href="Checkout/Cart.html"
  });

  removeButton.addEventListener("click", () => {
    removeFromCart(id, selectedSize);
    updateButtonText(quantity, null);
    removeButton.style.display= "none";
});
}

export function addToCart(jacket, selectedSize) {
  const cart = getCartFromLocalStorage();
  cartItem = cart.find((item)=> item.id === jacket.id && item.size === selectedSize);
  
  if (cartItem){
    cartItem.quantity +=1;
  }else{
    const itemPrice = jacket.on_sale ? parseFloat (jacket.prices.sale_price) : parseFloat(jacket.prices.regular_price);

  cart.push({
    id: jacket.id,
    name: jacket.name,
    price: jacket.prices.price,
    image:jacket.images[0].src, 
    on_sale: jacket.on_sale,
    size: selectedSize,
    quantity: 1,
    itemPrice: itemPrice,
    totalPrice:itemPrice,

  });
  cartItem = cart[cart.length -1]
}
cartItem.totalPrice = cartItem.itemPrice * cartItem.quantity;
  saveCartToLocalStorage(cart);
  return cartItem;

  incrementQuantity(jacket, selectedSize);
  updateButtonText(cartItem);
}

function updateButtonText() {
  const addToCartButton = jacketContainer.querySelector(".addedToCart");
  const cartButton = jacketContainer.querySelector(".cart_button");
  const removeButton =jacketContainer.querySelector(".info-button-remove");

  if (cartItem){
    const itemQuantity = cartItem.quantity

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
   
  }else{
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
    const itemIndex = cart.findIndex((item) => item.id === jacket.id && item.size === selectedSize);

    if (itemIndex !== -1){
      cart.splice(itemIndex, 1);
      saveCartToLocalStorage(cart);
    }
updateButtonText(quantity, cartItem);
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