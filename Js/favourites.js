import { getExistingFavs } from "./utils/favFunctions.js";

const favourites= getExistingFavs();

const jacketsContainer = document.querySelector(".product-container");

favourites.forEach (favourite =>{
    jacketsContainer.innerHTML+= `<div class= "product">
                                    <h4>${favourite.title}
                                    <i class= fa fa-heart"></i>
                                        </div>`;
});
