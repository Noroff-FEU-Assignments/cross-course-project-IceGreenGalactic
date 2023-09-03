import { getExistingFavs } from "./utils/favFunctions.js";

const url = "https://api.noroff.dev/api/v1/rainy-days";

async function getJackets() {
    const response = await fetch(url);
    const jacketList = await response.json();
   return jacketList}
   
    async function displayJackets(){
        const jacketList = await getJackets();
        const jacketsContainer = document.querySelector(".jackets-Shop");

    
       jacketList.forEach((jacket) =>{
        jacketsContainer.innerHTML += `<div class="jackets-Shop">
        <img  src="${jacket.image}" alt="${jacket.name}" />
        <h2 >${jacket.title}</h2>
        <p class="Price"> ${jacket.price} </p>
        <i class="far fa-heart" data-id="${jacket.id}" data-title="${jacket.title}"></i>
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
    
        const currentFavs = getExistingFavs();

        const productExist = currentFavs.find(function(fav) {
            return fav.id === id;
        });

        if (productExist === undefined){
      const product ={id: id, title: title};
        currentFavs.push(product);
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

//try {
    //if (simulatedError); {
  //  throw "bad things happened";
//}
//for(let i =0; i < jacket.length; i++){
   // if (limit && i === limit){
    //    break;
  //  }
//    resultsContainer.innerHTML+= createPublisher(publisher[i]);
//}
//}
//catch (error){
 //   console.log(error);
 //   resultsContainer.innerHTML= displayMessage ("error", error)
//}