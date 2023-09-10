import { fetchJackets, createHTML, handleClick } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";



document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".Index_Jackets-shop");
    let jacketList = [];
    try{
    if (jacketContainer){
       
  
        jacketList = await fetchJackets()
    

        let favourites = getExistingFavs();
        
        
        if (jacketList.length>0){
            const favJackets = jacketList.filter((jacket)=> jacket.favourite === true);
            
            
            displayJackets(
                favJackets.length> 0? favJackets: jacketList.slice(0, 5), 
                jacketContainer,
                favourites
            );
                 jacketContainer.addEventListener("click", (e) =>{
                if (e.target.classList.contains("fa-heart")){
                    const clicketJacketID = e.target.dataset.id;
                    const clicketJacket = jacketList.find((jacket) => jacket.id === clicketJacketID);
                    handleClick(e.target, favourites, jacketContainer);
                    toggleFavorite(clicketJacket);
                    favourites = getExistingFavs();
                    saveFavs(favourites);

                  
                         }
                 });

        }else{
            jacketContainer.innerHTML=
            "No jackets found"
        }
       
    }
        }catch (error) {
        console.error ("Error fetching jacket data:", error);
        jacketContainer.innerHTML="an error occured while fetching data. Please try again later";
        return[]
      }
    function displayJackets(jacketList, jacketContainer, favourites){
        jacketContainer.innerHTML="";
    
    jacketList.forEach((jacket)=>{
        createHTML(jacket,jacketContainer,favourites)
    });
}

});