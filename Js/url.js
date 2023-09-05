import { displayMessage } from "./utils/errorMessage.js";
const jacketsContainer = document.querySelector(target)
const url = "https://api.noroff.dev/api/v1/rainy-days";

export async function getURL() {
    try {
        const response = await fetch(url);
        const jacketList = await response.json();
       console.log(jacketList);
       
      jacketsContainer.innerHTML="";


      jacketList.forEach((jacket) =>{
        let cssClass="far"

        jacketsContainer.innerHTML += `<div class="jackets-Shop">
            <a href="Info.html?id=${jacket.id}">
            <img  src="${jacket.image}" alt="${jacket.description}" />
            <h2 >${jacket.title}</h2></a>
            <p class="Price"> ${jacket.price} </p>
            <i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
            </div>`
        });
       }

    catch(error){
        console.log(error);
        displayMessage();
    }
}
  