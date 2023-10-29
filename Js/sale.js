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
  const jacketContainer = document.querySelector(".jackets-Shop");
  let jacketList = [];
  try {
    if (jacketContainer) {
      jacketList = await fetchJackets();

      let favourites = getExistingFavs();
      const onSaleJackets = jacketList.filter((jacket) => jacket.on_sale);

      if (onSaleJackets.length > 0) {
        displayJackets(
          onSaleJackets.length > 0 ? onSaleJackets : onSaleJackets.slice(0, 5),
          jacketContainer,
          favourites
        );
        jacketContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("fa-heart")) {
            const clicketJacketID = e.target.dataset.id;
            const clicketJacket = onSaleJackets.find(
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
  function displayJackets(onSaleJackets, jacketContainer, favourites) {
    jacketContainer.innerHTML = "";

    onSaleJackets.forEach((jacket) => {
      createHTML(jacket, jacketContainer, favourites);
    });
  }
});
