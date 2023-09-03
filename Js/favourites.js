import { getExistingFavs } from "./utils/favFunctions.js";

const favourites= getExistingFavs();

const jacketsContainer = document.querySelector(".jackets-Shop");

favourites.forEach (favorite =>{
    jacketsContainer.innerHTML+= 
})