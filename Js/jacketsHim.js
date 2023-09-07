import { fetchJackets, filterFavoriteJackets, createHTML, handelClick} from "./jacketsList.js"; 
import { getExistingFavs, toggleFavorite,saveFavs } from "./utils/favFunctions.js";

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".jackets-Shop");
    try{
    if (jacketContainer){
        const jacketList = await fetchJackets(jacketContainer)
        let favourites = getExistingFavs();
        
        const maleJackets = jacketList.filter((jacket) => jacket.gender==="Male");

        if (maleJackets.length>0){
            maleJackets.forEach((jacket)=>{
                createHTML(jacket,jacketContainer,favourites);
            });
            jacketContainer.addEventListener("click", (e) =>{
                if (e.target.classList.contains("fa-heart")){
                    const clicketJacketID = e.target.dataset.id;
                    const clicketJacket = jacketList.find((jacket) => jacket.id === clicketJacketID);
                    handelClick(e.target, favourites, jacketContainer);
                    toggleFavorite(clicketJacket);
                    favourites = getExistingFavs()
                    saveFavs(favourites);
                    ;
                    }
            });

        }else{
          jacketContainer.innerHTML = "We are expanding our collection to include men's jackets!! Stay tuned for the latest updates, in the meantime, feel free to ecplore our fabulous range of women's jackets";
        }
    }
}catch(error){
            console.error("error fetching jacket data:", error)
        }
    
});
