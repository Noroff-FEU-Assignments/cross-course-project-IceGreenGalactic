
import { fetchJackets, createHTML, handleClick } from "./jacketsList.js";
import { getExistingFavs, toggleFavorite } from "./utils/favFunctions.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async () => {
    NavbarClosing();
});

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector(".jackets-Shop");
    try {
        if (jacketContainer) {

            const jacketList = await fetchJackets(jacketContainer)
            let favourites = getExistingFavs();

            const femaleJackets = jacketList.filter((jacket) => jacket.gender === "Female");


            if (femaleJackets.length > 0) {
                femaleJackets.forEach((jacket) => {
                    createHTML(jacket, jacketContainer, favourites);
                });

                jacketContainer.addEventListener("click", (e) => {
                    if (e.target.classList.contains("fa-heart")) {
                        const clicketJacketID = e.target.dataset.id;
                        const clicketJacket = jacketList.find((jacket) => jacket.id === clicketJacketID);
                        handleClick(e.target, favourites, jacketContainer);
                        toggleFavorite(clicketJacket);
                        favourites = getExistingFavs();


                    }
                });

            } else {
                jacketContainer.innerHTML = "<h2 class=empty-container>We are expanding our collection to include women's jackets!! Stay tuned for the latest updates, in the meantime, feel free to explore our fabulous range of men's jackets";

            }
        }
    } catch (error) {
        console.error("error fetching jacket data:", error);

    }

});
