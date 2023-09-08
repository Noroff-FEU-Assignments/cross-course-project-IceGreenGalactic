import { getExistingFavs, toggleFavorite,saveFavs } from "./utils/favFunctions.js";
import { hideLoader, showLoader } from "./utils/loader.js";
const jacketContainer = document.querySelector(".jacket-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");




const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;


async function getJackets() {

    try{
    const response = await fetch(url);
    if (!response.ok){
      throw new Error ("failed to fetch data");
    }
   
    const jacketInfo = await response.json();
   
   createHTML(jacketInfo);

      }  
      catch(error){
        console.error(error);
        jacketContainer.innerHTML = `<p> Failed to fetch data. Pleas try again</p>`
      }

    }
    
       getJackets()
        
   

        function createHTML(info){
            let cssClass="far"
        jacketContainer.innerHTML += `<div class="Jacket_info ">
                               <div >
                                 <h1 >${info.title}</h1>
                                  <h2> Color: ${info.baseColor}</h2>
                                    <h3>${info.description}</h3>
                                      <p class="info_Price"> ${info.price} </p>
                                     <div class="Size-button"></div>
                                      <a href="Checkout/addet.html" > <button class="Continue_button"> Add to cart </button></a>
                                    </div >
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` ;

const sizeButtonsContainer = jacketContainer.querySelector(".Size-button");
info.sizes.forEach((size) =>{
  const sizeButton = document.createElement("Button");
  sizeButton.textContent = size;
  sizeButton.className= "Size-button";
      sizeButton.addEventListener("click", () => {
        sizeButton.classList.toggle("clicked")
      });

      sizeButtonsContainer.appendChild (sizeButton)
    });
  }
