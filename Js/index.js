import { getJackets, createHTML} from "./jacketsList.js";
import { toggleFavorite, getExistingFavs } from "./utils/favFunctions.js";

let jacketContainer;

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".Index_Jackets-shop");
    try{
    if (jacketContainer){
        const jacketList = await getJackets(jacketContainer)
        const favourites = getExistingFavs();
        
        const favJackets = jacketList.filter((jacket) => jacket.favorite===true);
        
        if (favJackets.length>0){
            favJackets.forEach((jacket)=>{
            createHTML(jacket,jacketContainer, favourites);
          });
          
        }else{
            const firstFiveJackets = jacketList.slice(0,5);
            firstFiveJackets.forEach((jacket)=>{
                createHTML (jacket, jacketContainer, favourites);
            });
        }

jacketContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-heart")){
        e.target.classList.toggle("far");
    e.target.classList.toggle("fa");

       const id = e.target.dataset.id;
       const  title = e.target.dataset.title;
       const  image = e.target.dataset.image;
       const  price = e.target.dataset.price;
       const  description = e.target.dataset.description;

       toggleFavorite({
        id,
        title,
        image,
        price,
        description
       });
    }
    });
    }
        }catch (error) {
        console.error ("Error fetching jacket data:", error);
        return[]
      }
    });















//OLD JS
// import { getExistingFavs } from "./utils/favFunctions.js";
// const jacketsContainer = document.querySelector(".Index_Jackets-shop");


// const url = "https://api.noroff.dev/api/v1/rainy-days";

// const favourites = getExistingFavs();


// async function getJackets() {
//     const response = await fetch(url);
//     const jacketList = await response.json();
//    return jacketList}
   
//    async function displayJackets(){
//         const jacketList = await getJackets();
        
  
    
//        jacketList.forEach((jacket) =>{
//         let cssClass="far";
        
        
//         const doesObjectExist = favourites.find(function (fav) {
//         console.log(fav);
        
//         return parseInt(fav.id) === jacket.id;
        
//     })
    
//      if( doesObjectExist){
//         cssClass = "fa";
//      }
    
//         jacketsContainer.innerHTML += `<div class="jackets-Shop">
//         <a href="Info.html?id=${jacket.id}">
//         <img  src="${jacket.image}" alt="${jacket.description}" />
//         <h2 >${jacket.title}</h2></a>
//         <p class="Price"> $${jacket.price} </p>
//         <i class="${cssClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
//         </div>` }); 

   
//     const favButtons=document.querySelectorAll(".jackets-Shop i");
    
//     favButtons.forEach((button)=>{
//         button.addEventListener ("click", handelClick);
// //     });

//     function handelClick(){

//         this.classList.toggle("fa");
//         this.classList.toggle("far");

//         const id = this.dataset.id;
//         const title = this.dataset.title;
//         const image = this.dataset.image;
//         const price = this.dataset.price;
//         const description = this.dataset.description;
    
//         const currentFavs = getExistingFavs();

//         const productExist = currentFavs.find(function(fav) {
//             return fav.id === id;
//         });

//         if (productExist === undefined){
//       const jacket ={id: id, title: title, image:image, price:price, description:description, };
//         currentFavs.push(jacket);
//         saveFavs(currentFavs);  
//     } else {
//         const newFavs = currentFavs.filter((fav)=> fav.id !== id);
//         saveFavs(newFavs);
//          }
//     }
    
//     function saveFavs(favs){
//         localStorage.setItem("favourites", JSON.stringify(favs));
//     }
//     }
        
   

// displayJackets()


        
// // for (let i=0; i< jacketList.length; i++)
// // if (i ===3){
// //    break;
// // }

// // if (jacket.favorite===true){
// //     console.log ("JAPPPPPPPPPPPPPPPPPPP");

// // }
// // else if (jacket.favorite !== true){
// //     console.log ("NOOOOOOOOOOOOOOOOOOOOOOOOOO")
// // }