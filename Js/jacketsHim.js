import { getJackets, createHTML} from "./jacketsList.js";
import { toggleFavorite } from "./utils/favFunctions.js";


async function displayJackets(){ 
    try{
      
    const jacketsContainer = document.querySelector(".jackets-Shop");
    const jacketList = await getJackets();
    
    jacketList.forEach((jacket)=>{
      if (jacket.gender === "Male"){
        createHTML (jacket, jacketsContainer);

        
      }
    });  
        
}  catch(error){
  console.log(error)
}
}


displayJackets()
     
  //  function createHTML(jacket){
    
  //   jacketsContainer.innerHTML += `<div class="jackets-Shop">
  //   <a href="Info.html?id=${jacket.id}" class"Jacket_info">
  //   <img  src="${jacket.image}" alt="${jacket.description}" />
  //   <h2 >${jacket.title}</h2></a>
  //   <i class="far fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
  //   <p class="Price"> ${jacket.price} </p>
  //   </div>` };

// for ( let i=0; i<jacketList.length; i++) {
//     const jacket = jacket[i];