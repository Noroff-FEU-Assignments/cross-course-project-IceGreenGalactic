import { fetchJackets, createHTML, handleClick } from "./jacketsList.js";
import {  getExistingFavs, toggleFavorite,  saveFavs,} from "./utils/favFunctions.js";
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

      let userFavorites = getExistingFavs();
      const apiFavorites = jacketList.filter((jacket) => {
        return jacket.tags.some((tag) => tag.name === `favorite` );
      }); 
   
      if (apiFavorites.length > 0) {
        displayJackets(
          apiFavorites.length > 0 ? apiFavorites : apiFavorites.slice(0, 5),
          jacketContainer,
          userFavorites
        );
        jacketContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("fa-heart")) {
            const clicketJacketID = e.target.dataset.id;
            const clicketJacket = apiFavorites.find(
              (jacket) => jacket.id === clicketJacketID
            );

            handleClick(e.target, userFavorites, jacketContainer);
            toggleFavorite(clicketJacket);

            userFavorites = getExistingFavs();
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
  function displayJackets(apiFavorites, jacketContainer, userFavorites) {
    jacketContainer.innerHTML = "";

    apiFavorites.forEach((jacket) => { 
      createHTML(jacket, jacketContainer, userFavorites);
    });
  }
});
