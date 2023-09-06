const url = "https://api.noroff.dev/api/v1/rainy-days";
async function getJackets() {
    const response = await fetch(url);
    const jacketList = await response.json();
   return jacketList}
   
  async function displayJackets(){
        const jacketList = await getJackets();
        const jacketContainer = document.querySelector(".jackets-Shop");

    for ( let i=0; i<jacketList.length; i++) {
        const jacket = jacketList[i];

        const jacketDiv=document.createElement("div");
        jacketDiv.classList.add ("jackets-Shop");

        const productimage= document.createElement("img");
        productimage.classList.add("jackets-Shop");
        productimage.src= jacket.image;
        productimage.alt= jacket.description;

        const jacketName= document.createElement("h2");
        jacketName.classList.add("jackets-Shop");
        jacketName.textContent =jacket.title;

        const price= document.createElement("p");
        price.classList.add("Price");
        price.textContent = jacket.price;

        jacketContainer.appendChild(jacketDiv);
        jacketDiv.appendChild(productimage);
        jacketDiv.appendChild(jacketName);
        jacketDiv.appendChild(price);
    }
  }
  displayJackets();