import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";


const url = "https://api.noroff.dev/api/v1/rainy-days";
const jacketsContainer =document.querySelector(".jackets-Shop");
const favourites = getExistingFavs();

export async function getJackets() {
  try{
    const response = await fetch(url);
    const jacketList = await response.json();
   return jacketList;
} catch (error){
    console.error ("Error fetching jacket data:", error)
    return []
}
}
export function createHTML (jacket){
  const isFavorite = favourites.some((fav) => fav.id === jacket.id)
  const HeartClass= isFavorite? "fa" : "far"
    
  const jacketHTML= `<div class="jackets-Shop">
        <a href="Info.html?id=${jacket.id} "class= "Jacket_info">
        <img  src="${jacket.image}" alt="${jacket.description}" />
        <h2 >${jacket.title}</h2></a>
        <p class="Price"> ${jacket.price} </p>
        <i class="${HeartClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
        </div>`;

        jacketsContainer.innerHTML += jacketHTML;
    }

    jacketsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains ("fa-heart")){
      handelClick(e.target)
    }
  });

  

    function handelClick(heartIcon){
        console.log

        heartIcon.classList.toggle("fa");
        heartIcon.classList.toggle("far");

        const id = heartIcon.dataset.id;
        const title = heartIcon.dataset.title;
        const image = heartIcon.dataset.image;
        const price = heartIcon.dataset.price;
        const description = heartIcon.dataset.description;
    
        const currentFavs = getExistingFavs();

        const productExist = currentFavs.find((fav) => fav.id === id);

        if (productExist === undefined){
      const jacket ={
        id: id, 
        title: title, 
        image:image, 
        price:price, 
        description:description, 
      };
        currentFavs.push(jacket);
        saveFavs(currentFavs);  
    } else {
        const newFavs = currentFavs.filter((fav)=> fav.id !== id);
        saveFavs(newFavs);
         }
    }
    

  //   }
//<div class = "newPrice">${jacket.price} </div> $${jacket.discountedPrice}';



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



    //    jacketList.forEach((jacket) =>{
    //     let cssClass="far";
        
    //     const doesObjectExist = favourites.find(function (fav) {
    //     console.log(fav);
        
    //     return parseInt(fav.id) === jacket.id;
    // })
    
    
    

  //   //    }); 
  //       //if (jacket.onSale===true){
  //          // const.getElementsByClassName("Price")
  //         //  const jacketDiv = document.createElement("div");
  //           //jacketDiv.classList.add("newPrice");
    
  //  if(jacket.gender==="Female"){
  //   displayJackets()
  //  }
  //   const favButtons=document.querySelectorAll(".jackets-Shop i");
    
  //   favButtons.forEach((button)=>{
  //       button.addEventListener ("click", handelClick);
  //   });



  // // trying to fix again - older code removed
  
  
  // let cssClass ="far";

  // const doesObjectExist = favourites.find ((fav)=> parseInt(fav.id) === jacket.id);
   
  // if( doesObjectExist){
  //       cssClass = "fa";

  // const favButtons=document.querySelectorAll(".jackets-Shop i");
    
  // favButtons.forEach((button)=>{
  //     button.addEventListener ("click", handelClick);
//   // });      
// function saveFavs(favs){
//   localStorage.setItem("favourites", JSON.stringify(favs));
//  }