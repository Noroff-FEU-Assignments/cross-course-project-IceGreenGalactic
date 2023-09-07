import { createHTML } from "./jacketsList.js";
import { toggleFavorite } from "./utils/favFunctions.js";

export function displayJackets(jacketList, jacketContainer, favourites){
    jacketList.forech((jacket)=> {
        createHTML(jacket, jacketContainer,favourites);
    });

    jacketContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-heart")){
            e.target.classList.toggle("far");
        e.target.classList.toggle("fa");
    
           const id = e.target.dataset.id;
           const  title = e.target.dataset.title;
           const  image = e.target.dataset.image;
           const  price = e.target.dataset.price;
           const  description = e.target.dataset.description;
    
           toggleFavorite({
            id,
            title,
            image,
            price,
            description
           });
        }
        });
        }