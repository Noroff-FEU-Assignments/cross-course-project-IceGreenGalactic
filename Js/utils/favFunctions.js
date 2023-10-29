export function toggleFavorite(jacket) {
  try {
    if(jacket && jacket.id){
      jacket.id = parseInt(jacket.id, 10);
    const currentFavs = getExistingFavs();
    const filterFavs = currentFavs.filter((fav) => fav);
    const existingItemIndex = filterFavs.findIndex(
      (fav) => fav.id === jacket.id
    );
    console.log("jacket.id:", jacket.id);
    console.log("currentFavs:", currentFavs);
    console.log("existingItemIndex:", existingItemIndex);
    if (existingItemIndex === -1) {
      jacket.favorite = true;
      currentFavs.push(jacket);
    } else {
      jacket.favorite = false;
      currentFavs.splice(existingItemIndex, 1);
    }
    saveFavs(currentFavs);
  }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}
export function getExistingFavs() {
  try {
    const favs = localStorage.getItem("favourites");
    if (favs === null) {
      return [];
    }
    return JSON.parse(favs);
  } catch (error) {
    console.error("Error getting existing favorites:", error);
    return [];
  }
}
export function saveFavs(favs) {
  try {
    localStorage.setItem("favourites", JSON.stringify(favs));
  } catch (error) {
    console.error("Error saving favourites:", error);
  }
}
