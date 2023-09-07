import { getJackets, createHTML} from "./jacketsList.js";
import { toggleFavorite, getExistingFavs } from "./utils/favFunctions.js";

let jacketContainer;

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".jackets-Shop");
    try{
    if (jacketContainer){
        const jacketList = await getJackets(jacketContainer)
        const favourites = getExistingFavs();
        
        const femaleJackets = jacketList.filter((jacket) => jacket.gender==="Female");
        

        if (femaleJackets.length>0){
            femaleJackets.forEach((jacket)=>{
            createHTML(jacket,jacketContainer, favourites);
          });
          
        }else{
          jacketContainer.innerHTML = "We are expanding our collection to include men's jackets!! Stay tuned for the latest updates, in the meantime, feel free to ecplore our fabulous range of women's jackets";
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




//OLD JS TESTING NEW
// import { getJackets, createHTML} from "./jacketsList.js";
// import { toggleFavorite, getExistingFavs } from "./utils/favFunctions.js";

// let jacketContainer

// document.addEventListener("DOMContentLoaded", async () => {
//     const jacketContainer =document.querySelector(".jackets-Shop");
//     if (jacketContainer){
//         const jacketList = await getJackets(jacketContainer)
//         const favourites = getExistingFavs();

//            jacketList
//            .filter ((jacket) => jacket.gender==="Female")
//            .forEach((jacket) => {
//       if (jacket.gender === "Female"){
//         createHTML (jacket, jacketContainer, favourites);
//       } 
//     });


// jacketContainer.addEventListener("click", (e) => {
//     if (e.target.classList.contains("fa-heart")){
//         e.target.classList.toggle("far");
//     e.target.classList.toggle("fa");

//        const id = e.target.dataset.id;
//        const  title = e.target.dataset.title;
//        const  image = e.target.dataset.image;
//        const  price = e.target.dataset.price;
//        const  description = e.target.dataset.description;

//        toggleFavorite({
//         id,
//         title,
//         image,
//         price,
//         description
//        });
//     }
//     });
//     }
// });

// async function displayJacketsForHer(){ 
//     try{      
//         if (jacketContainer){
//          const jacketList = await getJackets(jacketContainer);
//     }   
// }  catch(error){
//   console.log(error)
// }
// }

// displayJacketsForHer()
     