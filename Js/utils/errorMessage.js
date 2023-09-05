export function displayMessage(messageType,message,target){
    const element = document.querySelector(".message-container");

    element.innerHTML= `<div class="message-error"> ${messageType}">${message} </div>`;
}