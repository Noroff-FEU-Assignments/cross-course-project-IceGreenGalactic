import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";

const url = "https://api.noroff.dev/api/v1/rainy-days";


export async function getJackets(jacketContainer) {
  try{
    const response = await fetch(url);
    const jacketList = await response.json();

    const favourites = getExistingFavs();
         
    const favJackets = jacketList.filter((jacket) => jacket.favorite===true);
        
    if (favJackets.length>0){
      return favJackets;
    
      
    }else{
      return jacketList.slice(0,5);
   
       }

         jacketList.forEach((jacket) =>{
      createHTML(jacket, jacketContainer, favourites);
    });

    return jacketList;
      }catch (error){
        console.error("error fetching jacket data:", error);
        return[]
      }
    }
  

export function createHTML (jacket, jacketContainer, favourites){
  const isFavorite = favourites.some((fav) => fav.id === jacket.id)
  const HeartClass= isFavorite? "fa" : "far"
    
  const jacketHTML= `<div class="jackets-Shop">
        <a href="Info.html?id=${jacket.id} "class= "Jacket_info">
        <img  src="${jacket.image}" alt="${jacket.description}" />
        <h2 >${jacket.title}</h2></a>
        <p class="Price"> ${jacket.price} </p>
        <i class="${HeartClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
        </div>`;

        jacketContainer.innerHTML += jacketHTML;
   
    jacketContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains ("fa-heart")){
      handelClick(e.target, favourites, jacketContainer)
    }
  });

}


    function handelClick(heartIcon, favourites, jacketContainer){
       
        heartIcon.classList.toggle("far");
        heartIcon.classList.toggle("fa");

        const id = heartIcon.dataset.id;
        const title = heartIcon.dataset.title;
        const image = heartIcon.dataset.image;
        const price = heartIcon.dataset.price;
        const description = heartIcon.dataset.description;

        toggleFavorite({
          id:id,
          title:title,
          image: image,
          price: price,
          description: description,
        });
    
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
    

// Old code that worked for him her page

// import { getExistingFavs, toggleFavorite, saveFavs } from "./utils/favFunctions.js";

// const url = "https://api.noroff.dev/api/v1/rainy-days";


// export async function getJackets(jacketContainer) {
//   try{
//     const response = await fetch(url);
//     const jacketList = await response.json();

//     const favourites = getExistingFavs();
    
            
//     const favJackets = jacketList.filter((jacket) => jacket.favorite===true);
        
//     if (favJackets.length>0){
//         favJackets.forEach((jacket)=>{
//         createHTML(jacket,jacketContainer, favourites);
//       });
      
//     }else{
//         const firstFiveJackets = jacketList.slice(0,5);
//         firstFiveJackets.forEach((jacket)=>{
//             createHTML (jacket, jacketContainer, favourites);
//         });
//     }
    

//     jacketList.forEach((jacket) =>{
//       createHTML(jacket, jacketContainer, favourites);
//     });

//    return jacketList;
//   } catch (error){
//     console.error ("Error fetching jacket data:", error);
//     return [];
//   }
// }

// export function createHTML (jacket, jacketContainer, favourites){
//   const isFavorite = favourites.some((fav) => fav.id === jacket.id)
//   const HeartClass= isFavorite? "fa" : "far"
    
//   const jacketHTML= `<div class="jackets-Shop">
//         <a href="Info.html?id=${jacket.id} "class= "Jacket_info">
//         <img  src="${jacket.image}" alt="${jacket.description}" />
//         <h2 >${jacket.title}</h2></a>
//         <p class="Price"> ${jacket.price} </p>
//         <i class="${HeartClass} fa-heart" data-id="${jacket.id}" data-title="${jacket.title}" data-image="${jacket.image}" data-price="${jacket.price}" data-description="${jacket.description}"  ></i>
//         </div>`;

//         jacketContainer.innerHTML += jacketHTML;
   
//     jacketContainer.addEventListener("click", (e) => {
//       if (e.target.classList.contains ("fa-heart")){
//       handelClick(e.target, favourites, jacketContainer)
//     }
//   });

// }


//     function handelClick(heartIcon, favourites, jacketContainer){
       
//         heartIcon.classList.toggle("far");
//         heartIcon.classList.toggle("fa");

//         const id = heartIcon.dataset.id;
//         const title = heartIcon.dataset.title;
//         const image = heartIcon.dataset.image;
//         const price = heartIcon.dataset.price;
//         const description = heartIcon.dataset.description;

//         toggleFavorite({
//           id:id,
//           title:title,
//           image: image,
//           price: price,
//           description: description,
//         });
    
//         const currentFavs = getExistingFavs();

//         const productExist = currentFavs.find((fav) => fav.id === id);

//         if (productExist === undefined){
//       const jacket ={
//         id: id, 
//         title: title, 
//         image:image, 
//         price:price, 
//         description:description, 
//       };
//         currentFavs.push(jacket);
//         saveFavs(currentFavs);  
//     } else {
//         const newFavs = currentFavs.filter((fav)=> fav.id !== id);
//         saveFavs(newFavs);
//          }
//     }