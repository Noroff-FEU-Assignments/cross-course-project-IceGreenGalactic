
import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";
import { hideLoader, showLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/errorMessage.js";
import { NavbarClosing } from "./utils/hamburgerMenu.js";

const url = "https://www.galacticvortexcode.no/wp-json/wc/store/products?per_page=100";

document.addEventListener("DOMContentLoaded", async()=>{
    NavbarClosing();
});
export async function fetchJackets() {
  try{
    showLoader();
    const response = await fetch(url);
    if (!response.ok){
      throw new Error ("failed to fetch data")
    }
    const jacketlist= await response.json();
    hideLoader();
    return jacketlist;
  
      }catch (error){
        const errorMessage="an error occurred while fetching jacket data. please try again later";
        const messageType = "Error";
        displayMessage(messageType,errorMessage);
        
      }
    }
  

export function filterFavoriteJackets(jacketList){
  const favourites = getExistingFavs();
  return jacketList.filter((jacket)=> {
    if (jacket.favourite){
      return favourites.some ((fav) => fav && fav.id === jacket.id);
    }

    return true;
});
}




export function createHTML (jacket, jacketContainer, favourites){
  const isFavorite = favourites.some((fav) => fav&& fav.id===jacket.id);
  const HeartClass = isFavorite ? "fa" : "far";
  
 const price= (parseInt(jacket.prices.price, 10) /100).toLocaleString( 'nb-NO',{
  style:`currency`,
  currency: `NOK`

 });
 const discountedPrice= (parseInt(jacket.prices.sale_price, 10) /100).toLocaleString( 'nb-NO',{
  style:`currency`,
  currency: `NOK`
 });
  
const image = jacket.images[0].src
const altText = jacket.images[0].alt
    
  const jacketHTML= `<div class="jackets-Shop ">
        <a href="Info.html?id=${jacket.id} "class= "Jacket_info">
        <img  src="${image}" alt="${altText}" />
        <h2 >${jacket.name}</h2></a>
        ${jacket.onSale?` <p class="Price original-price"> ${price} kr  </p>
          <p class = "onSale-price">  ${discountedPrice} kr</p>
          `
          : `<p class= "Price"> ${price} kr</p>`
        }
       
        <i class="${HeartClass} fa-heart" data-id="${jacket.id}" data-name="${jacket.name}" data-image="${image}" data-price="${price}" data-description="${jacket.description}"  ></i>
        </div>`;

        jacketContainer.innerHTML += jacketHTML;

        const heartIcon = jacketContainer.querySelector (`[data-id="${jacket.id}"]`)
        heartIcon.addEventListener("click", ()=>{
          handleClick(heartIcon,favourites,jacketContainer)
        });
    
    jacketContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains ("fa-heart")){
        e.target.classList.toggle("far");
        e.target.classList.toggle("fa");
      handleClick(e.target, favourites, jacketContainer)
      }
  });
}


export function handleClick(heartIcon, favourites, jacketContainer){
       
  heartIcon.classList.toggle("far");
  heartIcon.classList.toggle("fa");

  const id = heartIcon.dataset.id;
  const name = heartIcon.dataset.name;
  const image = heartIcon.dataset.image;
  const price = heartIcon.dataset.price;
  const description = heartIcon.dataset.description;

  toggleFavorite({
    id:id,
    name:name,
    image: image,
    price: price,
    description: description,
  });

  let currentFavs = getExistingFavs();

  const productExist = currentFavs.find((fav) => fav.id === id);

  if (productExist === undefined){
const jacket ={
  id: id, 
  name: name, 
  image:image, 
  price:price, 
  description:description, 
};
  currentFavs.push(jacket);
  saveFavs(currentFavs);  
} else {
  const newFavs = currentFavs.filter((fav)=> fav.id !== id);
  currentFavs= newFavs
  saveFavs(currentFavs);
   }
}