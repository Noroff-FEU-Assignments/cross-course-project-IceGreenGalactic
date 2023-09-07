import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";

const url = "https://api.noroff.dev/api/v1/rainy-days";


export async function fetchJackets() {
  try{
    const response = await fetch(url);
    return await response.json();
  
      }catch (error){
        console.error("error fetching jacket data:", error);
        return[]
      }
    }
  

export function filterFavoriteJackets(jacketList){
  const favourites =getExistingFavs();
  return jacketList.filter((jacket)=> jacket.facorite===true)
}