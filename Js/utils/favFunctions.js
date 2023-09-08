export function toggleFavorite(jacket){
    try{
    const currentFavs = getExistingFavs();
    const existingItemIndex = currentFavs.findIndex((fav) => fav.id === jacket.id);
   
if (existingItemIndex === -1){
    currentFavs.push(jacket);
}else{
currentFavs.splice(existingItemIndex, 1);
}
saveFavs(currentFavs)
}catch (error){
    console.error("Error toggling favorite:", error);
    }
}
export function getExistingFavs() {
    try{
    const favs= localStorage.getItem("favourites");
    if (favs === null){
        return [];
    } 
        return JSON.parse(favs);
    } catch (error){
        console.error("Error getting existing favorites:", error);
        return[];
    }
}
export function saveFavs(favs){

    try{
    localStorage.setItem ("favourites", JSON.stringify(favs));
    }catch (error){
        console.error("Error saving favourites:", error)
    }
}