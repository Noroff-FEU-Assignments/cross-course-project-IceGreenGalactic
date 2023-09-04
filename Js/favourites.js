import {getExistingFavs} from "./utils/favFunctions.js";

const favourites= getExistingFavs();

const jacketsContainer = document.querySelector(".jackets-Shop");

if(favourites.length === 0){
    jacketsContainer.innerHTML= " favourites is empty";
}

favourites.forEach ((favourite) => {
    jacketsContainer.innerHTML+= `<div class= "jackets-Shop">
                                      <i class="fa fa-heart"></i> 
                                     <img src="${favourite.image}" alt="${favourite.description}" />
                                    <p class="favourite-title">${favourite.title}</p>
                                    <p class="favourite-price"> ${favourite.price} </p>
                                        </div>`;
});