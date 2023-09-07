export function toggleFavorite(jacket){
    const currentFavs = getExistingFavs();
    const existingItemIndex = currentFavs.findIndex((fav) => fav.id === jacket.id);
   
if (existingItemIndex === -1){
    currentFavs.push(jacket);
}else{
currentFavs.splice(existingItemIndex, 1);
}
saveFavs(currentFavs)
}
export function getExistingFavs() {
    const favs= localStorage.getItem("favourites");
    if (favs === null){
        return [];
    } else { 
        return JSON.parse(favs);
    }
}
export function saveFavs(favs){
    localStorage.setItem ("favourites", JSON.stringify(favs));
}
// function saveFavs(favs){
//     localStorage.setItem("facourites", JSON.stringify(favs))
// }


// const newFavs = currentFavs.filter((fav) => fav.id !=jacket.id);
//     currentFavs = newFavs; }



//old version
// export function getExistingFavs() {
//     const favs= localStorage.getItem("favourites");
//     if (favs === null){
//         return [];
//     } else { 
//         return JSON.parse(favs);
//     }
// }

// export function toggleFavorite(jacket){
//     const currentFavs = getExistingFavs();
//     const existingItem = currentFavs.find((fav) => fav.id !== jacket.id);
   
// if (!existingItem){
//     currentFavs.push(jacket);
// }else{
// currentFavs = currentFavs.filter((fav) => fav.id!==jacket.id)
// }
// saveFavs(currentFavs)
// }
// // function saveFavs(favs){
// //     localStorage.setItem("facourites", JSON.stringify(favs))
// // }


// // const newFavs = currentFavs.filter((fav) => fav.id !=jacket.id);
// //     currentFavs = newFavs; }