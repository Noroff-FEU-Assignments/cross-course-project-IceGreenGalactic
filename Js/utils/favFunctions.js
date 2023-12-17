export function toggleFavorite(jacket) {
  try {
    if (jacket && jacket.id) {
      jacket.id = parseInt(jacket.id, 10);
      const userFavorites = getExistingFavs();
      const existingItemIndex = userFavorites.findIndex((fav) => fav.id === jacket.id);

      if (existingItemIndex === -1) {
        jacket.favorite = true;
        userFavorites.push(jacket);
      } else {
        const existingItem = userFavorites[existingItemIndex];
        existingItem.favorite = !existingItem.favorite

        if(!existingItem.favorite){
        userFavorites.splice(existingItemIndex, 1);
      }
    }
    saveFavs(userFavorites);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error); 
  }
}
export function getExistingFavs() {
  try {
    const userFavorites = localStorage.getItem("userFavorites");
    if (userFavorites === null) {
      return [];
    }
    return JSON.parse(userFavorites);
  } catch (error) {
    console.error("Error getting existing favorites:", error);
    return [];
  }
}
export function saveFavs(userFavorites) {
  try {
    localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}
