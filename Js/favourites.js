import {getExistingFavs} from "./utils/favFunctions.js";
import { createHTML } from "./jacketsList.js"; 

document.addEventListener("DOMContentLoaded", () => {
    const favourites= getExistingFavs();
    const jacketsContainer = document.querySelector(".jackets-Shop");

if(favourites.length === 0){
    jacketsContainer.innerHTML= " <h1>favourites is empty</h1>";
} else{
    favourites.forEach((favourite) =>{
        createHTML(favourite,jacketsContainer, favourites);
    });
}
});

