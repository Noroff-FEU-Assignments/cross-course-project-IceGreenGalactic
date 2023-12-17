import { createHTML, handleClick } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});


document.addEventListener("DOMContentLoaded", () => {
  let userFavorites = getExistingFavs();
  const jacketContainer = document.querySelector(".jackets-Shop");

  if (userFavorites.length === 0) {
    jacketContainer.innerHTML = "Favorites is empty";
  } else {
    userFavorites.forEach((userFavs) => {
      createHTML(userFavs, jacketContainer, userFavorites);
    });
  }
  
  jacketContainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-heart")) {
      handleClick(e.target, userFavorites, jacketContainer);
      }
    });

      userFavorites = getExistingFavs();
      jacketContainer.innerHTML="";

      if (userFavorites.length === 0) {
        jacketContainer.innerHTML = "Favorites is empty";
      } else {
        userFavorites.forEach((userFavs) => {
          createHTML(userFavs, jacketContainer, userFavorites);
          
        });
    } 
});
