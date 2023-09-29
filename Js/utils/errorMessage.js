export function displayMessage(messageType,message,target){
    const errorDiv = document.createElement("div");
    const element = document.querySelector(".message-error");
    errorDiv.className = "message-error";
    errorDiv.innerHTML = `<div>${messageType}: ${message}</div>`

    const existingErrorDiv = document.querySelector(".message-error");
    if (existingErrorDiv){
        document.body.replaceChild(errorDiv, existingErrorDiv);
    }else{
        
    document.body.appendChild(errorDiv);
    }

    setTimeout(() => {
        errorDiv.style.display ="none"
    }, 5000);
}