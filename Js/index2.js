import { getJackets} from "./jacketsList.js";
const jacketsContainer = document.querySelector(".Index_Jackets-shop");
console.log(getJackets)


jacketsContainer.innerHTML += `<div class="jackets-container">
<a href="Info.html?id=${jacket.id}">
<img  src="${jacket.image}" alt="${jacket.description}" />
<h2 >${jacket.title}</h2></a>
<p class="Price"> ${jacket.price} </p>
<i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
</div>`;

// jacket = $.sort ((a,b)=>{
//     if (a.id< b.id){
//         console.log("hhoogseoisnoi")
//     }
// })


 console.log(getJackets)

//test things