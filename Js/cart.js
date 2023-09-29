import { fetchJackets, createHTML } from "./jacketsList.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartFromLocalStorage } from "./info.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", async () => {
  NavbarClosing();
});

document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.querySelector(".Shoppingbag");
  // const shoppingBag = document.querySelector (".Cart-Bergolos");

  try {
    if (cartContainer) {
      const cartItems = getCartFromLocalStorage();
      const jacketList = await fetchJackets(cartContainer);
      const favourites = getExistingFavs();

      cartContainer.innerHTML = "";

      cartItems.forEach((cartItem) => {
        const jacket = jacketList.find(
          (jacketItem) => jacketItem.id === cartItem.id
        );

        if (jacket) {
          createHTML(jacket, cartContainer, favourites);

          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("Cart-Bergolos");

          const img = document.createElement("img");
          img.src = jacket.image;
          img.alt = jacket.description;

          const titleDiv = document.createElement("div");
          const priceDiv = document.createElement("div");
          const amountDiv = document.createElement("div");
          const totalDiv = document.createElement("div");
          const colorDiv = document.createElement("div");

          const titleH3 = document.createElement("h3");
          const priceP = document.createElement("p");
          if (jacket.onSale === true) {
            priceP.textContent = `$${jacket.discountedPrice}`;
          } else {
            priceP.textContent = `$${jacket.price}`;
          }
          const amountH4 = document.createElement("h4");
          const totalP = document.createElement("p");
          const color = document.createElement("h4");

          titleH3.textContent = jacket.title + `` + jacket.tags;
          priceP.textContent = `$${jacket.price}`;
          amountH4.classList.add("amount");
          amountH4.textContent = "1";
          color.textContent = jacket.baseColor;

          titleDiv.appendChild(titleH3);
          priceDiv.appendChild(priceP);
          amountDiv.appendChild(amountH4);
          colorDiv.appendChild(color);

          const totalPrice = parseFloat(jacket.price) * 1;
          totalP.textContent = `$${totalPrice.toFixed(2)}`;

          totalDiv.appendChild(totalP);

          cartItemDiv.appendChild(img);
          cartItemDiv.appendChild(titleDiv);
          cartItemDiv.appendChild(priceDiv);
          cartItemDiv.appendChild(amountDiv);
          cartItemDiv.appendChild(colorDiv);
          cartItemDiv.appendChild(totalDiv);

          cartContainer.appendChild(cartItemDiv);
        }
      });
    }

    window.addEventListener("load", () => {});
  } catch (error) {
    console.error(error);
  }
});
