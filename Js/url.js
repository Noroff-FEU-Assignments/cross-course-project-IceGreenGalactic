import { displayMessage } from "./utils/errorMessage.js";
const url = "https://api.noroff.dev/api/v1/rainy-days";


async function getJackets() {
    try {
        const response = await fetch(url);
        const jacketList = await response.json();
        return jacketList;
}
    catch(error){
        console.log(error);
        displayMessage();
    }
     }
   
 getJackets()   
 export async function displayJackets(target){
    const jacketList = await getJackets();
     const jacketsContainer = document.querySelector(target);
    jacketsContainer.innerHTML="jacketshop"}
    const jacket = jacketList i

jacketsContainer.forEach(function (jacket){
   jacketsContainer.innerHTML += `<div class="jackets-Shop">
   <a href="Info.html?id=${jacket.id}">
   <img  src="${jacket.image}" alt="${jacket.description}" />
   <h2 >${jacket.title}</h2></a>
   <p class="Price"> ${jacket.price} </p>
   <i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
   </div>`; });
     
   displayJackets()