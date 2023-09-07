import { getJackets, createHTML} from "./jacketsList.js";
import { toggleFavorite, getExistingFavs } from "./utils/favFunctions.js";

let jacketContainer;

document.addEventListener("DOMContentLoaded", async () => {
    const jacketContainer = document.querySelector (".jackets-Shop");
    try{
    if (jacketContainer){
        const jacketList = await getJackets(jacketContainer)
        const favourites = getExistingFavs();
        
        const maleJackets = jacketList.filter((jacket) => jacket.gender==="Male");

        if (maleJackets.length>0){
          maleJackets.forEach((jacket)=>{
            createHTML(jacket,jacketContainer, favourites);
          });
          
        }else{
          jacketContainer.innerHTML = "We are expanding our collection to include men's jackets!! Stay tuned for the latest updates, in the meantime, feel free to ecplore our fabulous range of women's jackets";
        }

    //     return jacketList
    //   }catch (error) {
    //     console.error ("Error fetching jacket data:", error);
    //     return[]
    //   }
    // }

    //       jacketList
    //         .filter((jacket)=> jacket.gender === "Male")
    //        .forEach((jacket) => {
    //         if (jacket.gender==="Male"){
    //         const isFavorite = favourites.some((fav) => fav.id === jacket.id);
    //         const HeartClass = isFavorite ? "fa" : "far";

    //     createHTML (jacket, jacketContainer, favourites, HeartClass);
    //         }
          
    //   });
    // }


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
