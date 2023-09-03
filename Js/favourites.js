import {getExistingFavs} from "./utils/favFunctions.js";

const favourites= getExistingFavs();

const jacketsContainer = document.querySelector(".jackets-Shop");

if(favourites.length === 0){
    jacketsContainer.innerHTML= " favourites is empty";
}

favourites.forEach ((favourite) => {
    jacketsContainer.innerHTML+= `<div class= "jackets-Shop">
                                    <img  src="${favourite.image}" alt="${favourite.description}" />
                                    <h2>${favourite.title}</h2>
                                    <p class="Price"> ${favourite.price} </p>
                                    <i class= fa fa-heart"></i>
                                        </div>`;
});