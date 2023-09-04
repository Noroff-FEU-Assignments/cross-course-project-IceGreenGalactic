import {getExistingFavs} from "./utils/favFunctions.js";
import { getJackets } from "./jacketsList.js";

const favourites= getExistingFavs();

const jacketsContainer = document.querySelector(".jackets-Shop");

if(favourites.length === 0){
    jacketsContainer.innerHTML= " favourites is empty";
}

favourites.forEach ((favourite) => {
    jacketsContainer.innerHTML+= `<div class= "jackets-Shop">
                                     
                                      <a href="Info.html?id=${favourite.id}">
                                     <img src="${favourite.image}" alt="${favourite.description}" />
                                    <p class="favourite-title">${favourite.title}</p></a>
                                    <p class="favourite-price"> ${favourite.price} </p> 
                                    <i class="fa fa-heart"></i> 
                                        </div>`;
});
