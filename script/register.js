import axios from "../api/axios.js";
import { handleLoading, handleNotification, saveToLocalStorage } from "../utils/index.js";

const $authForm = document.querySelector("#auth-form");
const $authSubmit = $authForm.querySelector("#auth-submit");
const $toast = document.querySelector("#liveToast");

function User(name, email, password){
    this.name = name;
    this.email = email;
    this.password = password;
}

const createNewUser = async (e) => {
    e.preventDefault();

    const children = Array.from(e.target.children).slice(0, 3);
    const formValues = children.map(input => input.value)
    const user = new User(...formValues);
    
    try{
        handleLoading(true, $authSubmit)
        const response = await axios.post("/users", user);
        const data = response.data;
        if(data.token){
            saveToLocalStorage("token", data.token)
            handleNotification("Successfully registered", "success", $toast, 0)
            $authForm.innerHTML = "We are redirecting you, please wait..."
            setTimeout(() => {
                location.replace(location.origin + "/src/pages/profile.html");
            }, 3000);
        }
    }
    catch(error){
        console.log(error)
        let message = error.response.data.message;
        if(message.toLowerCase().includes("exist")){
            message = message + ` <br> Already have an account? <a href='${location.origin + '/src/pages/login.html'}'>Login</a>`
        }
        handleNotification(message, "error", $toast, 0)
    }
    finally{
        handleLoading(false, $authSubmit)
    }
}

$authForm.addEventListener("submit", createNewUser);