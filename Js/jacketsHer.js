import { getJackets, createHTML} from "./jacketsList.js";
import { toggleFavorite } from "./utils/favFunctions.js";


async function displayJackets(){ 
    try{
      
    const jacketsContainer = document.querySelector(".jackets-Shop");
    const jacketList = await getJackets();
    
    jacketList.forEach((jacket)=>{
      if (jacket.gender === "Female"){
        createHTML (jacket, jacketsContainer);

        
      }
    });  
        
}  catch(error){
  console.log(error)
}
}


displayJackets()
     