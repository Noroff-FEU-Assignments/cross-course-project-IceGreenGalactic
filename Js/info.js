

const jacketsContainer = document.querySelector(".jacket-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id)

const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;
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
        jacketsContainer.innerHTML += `<div class="Jacket_info ">
                                     <div >
                                         <h1 >${info.title}</h1>
                                         <h2> Color: ${info.baseColor}</h2>
                                         <h3>${info.description}</h3>
                                           <p class="info_Price"> ${info.price} </p>
                                    </div>
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` };