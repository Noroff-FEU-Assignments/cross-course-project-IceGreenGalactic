const url = "https://api.noroff.dev/api/v1/rainy-days";


 export async function getJackets() {
    const response = await fetch(url);
    const jacketList = await response.json();
   return jacketList}
   
    export function getGender(){
        const jacketList = await getJackets();
  {
   
const jacket = jacketList.filter((jacket)=>
 { return jacket.gender === "Female"})


       
       jacketList.forEach((jacket))
    
    
    const jacketsContainer = document.querySelector(".jackets-Shop");

    jacketsContainer.innerHTML += `<div class="jackets-Shop">
    <a href="Info.html?id=${jacket.id}">
    <img  src="${jacket.image}" alt="${jacket.description}" />
    <h2 >${jacket.title}</h2></a>
    <p class="Price"> ${jacket.price} </p>
    <i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
    </div>` ; 
}}
getGender()
console.log(getGender)