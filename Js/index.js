import { fetchJackets, filterFavoriteJackets, createHTML } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";


document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".Index_Jackets-shop");

    try{
    if (jacketContainer){
        const jacketList = await fetchJackets()
        const favourites = getExistingFavs();
        
        
        if (jacketList.length>0){
            const favJackets = filterFavoriteJackets(jacketList);
            displayJackets(
                favJackets.length> 0? favJackets: jacketList.slice(0, 5), 
                jacketContainer,
                favourites);

        }else{
            jacketContainer.innerHTML=
            "No jackets found"
        }
    }
        }catch (error) {
        console.error ("Error fetching jacket data:", error);
        return[]
      }
    });
    function displayJackets(jacketList, jacketContainer, favourites){
        jacketContainer.innerHTML="";
    
    jacketList.forEach((jacket)=>{
        createHTML(jacket,jacketContainer,favourites)
    });
}
