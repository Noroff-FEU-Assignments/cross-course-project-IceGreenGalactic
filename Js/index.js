import { fetchJackets, createHTML, handleClick } from "./jacketsList.js";
import {
  getExistingFavs,
  toggleFavorite,
  saveFavs,
} from "./utils/favFunctions.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

document.addEventListener("DOMContentLoaded", async () => {
  const jacketContainer = document.querySelector(".Index_Jackets-shop");
  let jacketList = [];
  try {
    if (jacketContainer) {
      jacketList = await fetchJackets();

      let favourites = getExistingFavs();
      const favJackets = jacketList.filter((jacket) => {
        return jacket.tags.some((tag) => tag.name === `favorite` );
      }); 
      console.log (favJackets)
      if (favJackets.length > 0) {
        displayJackets(
          favJackets.length > 0 ? favJackets : favJackets.slice(0, 5),
          jacketContainer,
          favourites
        );
        jacketContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("fa-heart")) {
            const clicketJacketID = e.target.dataset.id;
            const clicketJacket = favJackets.find(
              (jacket) => jacket.id === clicketJacketID
            );

            handleClick(e.target, favourites, jacketContainer);
            toggleFavorite(clicketJacket);

            favourites = getExistingFavs();
          }
        });
      } else {
        jacketContainer.innerHTML = "No jackets found";
      }
    }
  } catch (error) {
    console.error("Error fetching jacket data:", error);
    jacketContainer.innerHTML =
      "an error occured while fetching data. Please try again later";
    return [];
  }
  function displayJackets(favJackets, jacketContainer, favourites) {
    jacketContainer.innerHTML = "";

    favJackets.forEach((jacket) => {
      createHTML(jacket, jacketContainer, favourites);
    });
  }
});
