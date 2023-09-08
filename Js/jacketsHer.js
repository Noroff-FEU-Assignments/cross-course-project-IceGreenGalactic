import { showLoaders } from "./utils/loader.js";
import { fetchJackets, filterFavoriteJackets, createHTML, handelClick} from "./jacketsList.js"; 
import { getExistingFavs, toggleFavorite,saveFavs } from "./utils/favFunctions.js";

const newContaner =document.querySelector(".loader");

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".jackets-Shop");
    try{
    if (jacketContainer){
        showLoaders(".loader")
    newContaner.innerHTML="";
        const jacketList = await fetchJackets(jacketContainer)
        let favourites = getExistingFavs();
        
        const femaleJackets = jacketList.filter((jacket) => jacket.gender==="Female");
newContaner.innerHTML="";

        if (femaleJackets.length>0){
            femaleJackets.forEach((jacket)=>{
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
          jacketContainer.innerHTML = "We are expanding our collection to include women's jackets!! Stay tuned for the latest updates, in the meantime, feel free to explore our fabulous range of men's jackets";
        }
    }
}catch(error){
            console.error("error fetching jacket data:", error)
        }
    
});
