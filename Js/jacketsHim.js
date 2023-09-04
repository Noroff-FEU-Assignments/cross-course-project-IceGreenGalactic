import { getJackets,displayJackets} from "./jacketsList.js";
import { displayMessage } from "./utils/errorMessage.js";

jacketsContainer.innerHTML += `<div class="jackets-Shop">
<a href="Info.html?id=${jacket.id}">
<img  src="${jacket.image}" alt="${jacket.description}" />
<h2 >${jacket.title}</h2></a>
<p class="Price"> ${jacket.price} </p>
<i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
</div>`; 

getJackets();
displayJackets()