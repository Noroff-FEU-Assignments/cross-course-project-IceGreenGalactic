

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
                                           <h3 class="info_Price"> ${info.price} </h3> 
                                           
                                    </div>
                                         <img  src="${info.image}" alt="${info.description}" />
                                         </div>` };

                                        //  `<div class="Jacket_info">
                                        //  <div class="info_Bergolos">
                                        //   <h1 class="Info_Bergolos">${info.title}</h1>
                                        //   <ul>
                                        //   <p> ${info.gender}</p>
                                        //   <p>${info.description}></p>
                                        //   <h3 class="info_Price"> ${info.price} </h3> </ul>
                                        //   <div><button class="Size-button"> ${info.sizes} </button> </div>
                                        //   <img  src="${info.image}" alt="${info.description}" />
                                        //   <i class="${cssClass} fa-heart" data-id="${info.id}" data-title="${info.title}" data-image="${info.image}" data-price="${info.price}" data-description="${info.description}"  ></i>
                                        //   </div>` };

                                        // <div><button class="Size-button"> ${info.sizes} </button> </div>
                                        // <i class="${cssClass} fa-heart" data-id="${info.id}" data-title="${info.title}" data-image="${info.image}" data-price="${info.price}" data-description="${info.description}"  ></i>
