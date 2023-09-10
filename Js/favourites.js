import { createHTML, handleClick } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite } from "./utils/favFunctions.js";

document.addEventListener("DOMContentLoaded", () => {
    let favourites= getExistingFavs();
    const jacketsContainer = document.querySelector(".jackets-Shop");

if(favourites.length === 0){
    jacketsContainer.innerHTML= "favourites is empty";
} else{
    favourites.forEach((favourite) =>{
        createHTML(favourite ,jacketsContainer, favourites);
    });
}
jacketsContainer.addEventListener("click", (e) =>{
    if (e.target.classList.contains("fa-heart")){
        const clicketJacketID = e.target.dataset.id;
        const clicketJacket = favourites.find((jacket) => jacket.id === clicketJacketID);
        handleClick(e.target, favourites, jacketsContainer);
        toggleFavorite(clicketJacket);
        favourites = getExistingFavs();

     }
 });
});