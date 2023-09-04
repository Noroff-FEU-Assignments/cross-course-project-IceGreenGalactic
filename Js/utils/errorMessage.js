export function displayMessage(messageType,message,target){
    const element = document.querySelector(target);

    element.innerHTML= `<div class="message-error"> ${messageType}">${message} </div>`;
}