

const jacketsContainer = document.querySelector(".Index_Jackets-shop");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

console.log(params)

const id = params.getAll("favorite");



console.log(id)

const url = "https://api.noroff.dev/api/v1/rainy-days/" + id===true;
console.log(url)

async function getJackets() {

    try{
    const response = await fetch(url);
    const jacketList = await response.json();
   
    console.log(jacketList);
   
   createHTML(jacketList);
    
      }  
      catch(error){
        console.log(error)
      }
let cssClass="far"
    }
    
       getJackets()
        
   

        function createHTML(info){
            let cssClass="far"
        jacketsContainer.innerHTML += `<div class="Index_Jackets-shop ">
                                     <div >
                                         <h1 >${info.title}</h1>
                                         <h2> Color: ${info.baseColor}</h2>
                                         <h3>${info.description}</h3>
                                           <p class="info_Price"> ${info.price} </p>
                                    </div>
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` };