import { getExistingFavs } from "./utils/favFunctions.js";


const url = "https://api.noroff.dev/api/v1/rainy-days";

const favourites = getExistingFavs();
export async function getJackets() {
    const response = await fetch(url);
    const jacketList = await response.json();
   return jacketList}
   
    export async function displayJackets(){
        const jacketList = await getJackets();
        const jacketsContainer = document.querySelector(".jackets-Shop");

       
    
       jacketList.forEach((jacket) =>{
        let cssClass="far";
        
        const doesObjectExist = favourites.find(function (fav) {
        console.log(fav);
        
        return parseInt(fav.id) === jacket.id;
    })
    
     if( doesObjectExist){
        cssClass = "fa";
     }
    

        jacketsContainer.innerHTML += `<div class="jackets-Shop">
        <a href="Info.html?id=${jacket.id}">
        <img  src="${jacket.image}" alt="${jacket.description}" />
        <h2 >${jacket.title}</h2></a>
        <p class="Price"> ${jacket.price} </p>
        <i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
        </div>` }); 
        //if (jacket.onSale===true){
           // const.getElementsByClassName("Price")
          //  const jacketDiv = document.createElement("div");
            //jacketDiv.classList.add("newPrice");
    
   
    const favButtons=document.querySelectorAll(".jackets-Shop i");
    
    favButtons.forEach((button)=>{
        button.addEventListener ("click", handelClick);
    });

    function handelClick(){

        this.classList.toggle("fa");
        this.classList.toggle("far");

        const id = this.dataset.id;
        const title = this.dataset.title;
        const image = this.dataset.image;
        const price = this.dataset.price;
        const description = this.dataset.description;
    
        const currentFavs = getExistingFavs();

        const productExist = currentFavs.find(function(fav) {
            return fav.id === id;
        });

        if (productExist === undefined){
      const jacket ={id: id, title: title, image:image, price:price, description:description, };
        currentFavs.push(jacket);
        saveFavs(currentFavs);  
    } else {
        const newFavs = currentFavs.filter((fav)=> fav.id !== id);
        saveFavs(newFavs);
         }
    }
    
    function saveFavs(favs){
        localStorage.setItem("favourites", JSON.stringify(favs));
    }
    }
//<div class = "newPrice">${jacket.price} </div> $${jacket.discountedPrice}';

displayJackets();
