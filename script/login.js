import axios from "../api/axios.js";
import { handleLoading, handleNotification, saveToLocalStorage } from "../utils/index.js";

const $authForm = document.querySelector("#auth-form");
const $authSubmit = $authForm.querySelector("#auth-submit");
const $toast = document.querySelector("#liveToast");

function User(email, password){
    this.email = email;
    this.password = password;
}

const loginUser = async (e) => {
    e.preventDefault();

    const children = Array.from(e.target.children).slice(0, 2);
    const formValues = children.map(input => input.value)
    const user = new User(...formValues);
    
    try{
        handleLoading(true, $authSubmit)
        const response = await axios.post("/users/login", user);
        const data = response.data;
        if(data.token){
            saveToLocalStorage("token", data.token)
            handleNotification("Successfully logged in", "success", $toast, 0)
            $authForm.innerHTML = "We are redirecting you, please wait..."
            setTimeout(() => {
                location.replace(location.origin + "/src/pages/profile.html");
            }, 3000);
        }
    }
    catch(error){
        let message = error.response.data.message;
        if(message.toLowerCase().includes("invalid")){
            message = message + ` <br> Don't you have an account? <a href='${location.origin + '/src/pages/register.html'}'>Register</a>`
        }
        handleNotification(message, "error", $toast, 0)
    }
    finally{
        handleLoading(false, $authSubmit)
    }
}

$authForm.addEventListener("submit", loginUser);