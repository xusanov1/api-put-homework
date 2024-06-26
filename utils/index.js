export const showAndHide = (display, element) => {
    element.style.display = display
}

export const handleLoading = (status, element) => {
    const loadingElement = element.querySelector(".spinner-border");
    if(status){
        showAndHide("block", loadingElement)
    }
    else{
        showAndHide("none", loadingElement)
    }
}

export const handleNotification = (message, type, element, notifactionNumber) => {
    const notificationTypes = ["Authorization", "Permission", "Upload", "Create"]
    const $toastImage = element.querySelector("#toast-image");
    const $toastTitle = element.querySelector("#toast-title");
    const $toastMessage = element.querySelector("#toast-message");
    const $toast = new bootstrap.Toast(element);
    $toastImage.src = `../images/${type}-icon.png`;
    $toastTitle.innerText = notificationTypes[notifactionNumber];
    $toastMessage.innerHTML = message;

    $toast.show();
}

export const saveToLocalStorage = (key, data) => {
    if(typeof data === "object" && data !== null){
        localStorage.setItem(key, JSON.stringify(data))
    }
    else{
        localStorage.setItem(key, data)
    }
}