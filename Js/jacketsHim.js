import { getJackets} from "./--TESTLIST.js";
const jacketsContainer = document.querySelectorAll("jackets-Shop");
console.log(getJackets)


async function displayJackets(){ 
    try{
    const jacketList = await getJackets();
    
        console.log(jacketList);
       
       createHTML(jacketList);
      
        
}  
catch(error){
  console.log(error)
}
 let cssClass="far";
}


displayJackets()
     
   function createHTML(jacket){
    
    jacketsContainer.innerHTML += `<div class="jackets-Shop">
    <a href="Info.html?id=${jacket.id}" class"Jacket_info">
    <img  src="${jacket.image}" alt="${jacket.description}" />
    <h2 >${jacket.title}</h2></a>
    <i class="far fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
    <p class="Price"> ${jacket.price} </p>
    </div>` };

// for ( let i=0; i<jacketList.length; i++) {
//     const jacket = jacket[i];