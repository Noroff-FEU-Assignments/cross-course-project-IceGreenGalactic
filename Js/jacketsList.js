import {  getExistingFavs, toggleFavorite, saveFavs,} from "./utils/favFunctions.js";
import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

const url =
  "https://www.galacticvortexcode.no/wp-json/wc/store/products?per_page=100";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});


export async function fetchJackets() {
  try {
    showLoader();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("failed to fetch data");
    }
    const jacketlist = await response.json();
    hideLoader();
    return jacketlist;
  } catch (error) {
    const errorMessage =
      "an error occurred while fetching jacket data. please try again later";
    const messageType = "Error";
    displayMessage(messageType, errorMessage);
  }
}

export function filterFavoriteJackets(jacketList) {
  const userFavorites = getExistingFavs();
  return jacketList.filter((jacket) => {
    if (jacket.isFavorite) {
      return userFavorites.some((fav) => fav && fav.id === jacket.id);
    }

    return true;
  });
}

export function createHTML(jacket, jacketContainer, userFavorites) {
  const isFavorite = userFavorites.some((fav) => fav && fav.id === jacket.id);
  const HeartClass = isFavorite ? "fa" : "far";
  
  console.log(`Jacket ID: ${jacket.id}, isFavorite: ${isFavorite}`);

  const price =
    jacket.prices && jacket.prices.regular_price
      ? (parseInt(jacket.prices.regular_price, 10) / 100).toLocaleString("nb-NO", {
        style: `currency`,
        currency: `NOK`,
      }) 
      :  "";

  const discountedPrice =
    jacket.prices  && jacket.prices.sale_price
      ? (parseInt(jacket.prices.sale_price, 10) / 100).toLocaleString("nb-NO", {
        style: `currency`,
        currency: `NOK`,
      })
      :  "";

  const image =
    jacket.image ||
    (jacket.images && jacket.images.length > 0 ? jacket.images[0].src : "");
  const altText =
    jacket.image ||
    (jacket.images && jacket.images.length > 0 ? jacket.images[0].alt : "");

  const jacketHTML = `<div class="jackets-Shop ">
        <a href="Info.html?id=${jacket.id} "class= "Jacket_info">
        <img  src="${image}" alt="${altText}" />
        <h2 >${jacket.name}</h2></a>
        ${jacket.on_sale
      ? ` <p class="Price original-price"> ${price} kr  </p>
          <p class = "onSale-price">  ${discountedPrice} kr</p>
          `
      : `<p class= "Price"> ${price} kr</p>`
    }
       
        <i class="${HeartClass} fa-heart" data-id="${jacket.id}" data-name="${jacket.name
    }" data-image="${image}" data-price="${price}" data-description="${jacket.description
    }"  ></i>
        </div>`;

  jacketContainer.innerHTML += jacketHTML;

  const heartIcon = jacketContainer.querySelector(`[data-id="${jacket.id}"]`);
  if (heartIcon) {
    if (!heartIcon.hasClickEvent) {
      heartIcon.addEventListener("click", () => {
        handleClick(heartIcon, userFavorites, jacketContainer);
      });
      heartIcon.hasClickEvent = true;
    }
  }
}

export function handleClick(heartIcon, userFavorites, jacketContainer) {
  heartIcon.classList.toggle("far");
  heartIcon.classList.toggle("fa");

  const id = heartIcon.dataset.id;
  const name = heartIcon.dataset.name;
  const image = heartIcon.dataset.image;
  const price = parseFloat(heartIcon.dataset.price);
  const discountedPrice = parseFloat(heartIcon.dataset.discountedPrice);

 
  toggleFavorite({
    id: id,
    name: name,
    image: image,
    price: price,
    discountedPrice: discountedPrice,
  });
  userFavorites = getExistingFavs();
}
