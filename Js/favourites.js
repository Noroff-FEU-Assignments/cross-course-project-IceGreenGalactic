import { createHTML, handleClick } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite } from "./utils/favFunctions.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";



document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

document.addEventListener("DOMContentLoaded", () => {
  let favourites = getExistingFavs();
  const jacketContainer = document.querySelector(".jackets-Shop");
  

  if (favourites.length === 0) {
    jacketContainer.innerHTML = "favourites is empty";
  } else {
    favourites.forEach((favourite) => {
      createHTML(favourite, jacketContainer, favourites);
    });
  }
  jacketContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-heart")) {
      const clicketJacketID = e.target.dataset.id;
      const clicketJacket = favourites.find(
        (jacket) => jacket.id === clicketJacketID
      );
      handleClick(e.target, favourites, jacketContainer);
      toggleFavorite(clicketJacket);
      favourites = getExistingFavs();
    }
  });
});
