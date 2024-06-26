import axios from "../api/axios.js";
import { handleLoading } from "../utils/index.js";

const $container = document.querySelector("#container");
const result = document.querySelector("#result")


const loadProfileData = async () => {
    
    try{
        handleLoading(true, $container)
        const response = await axios("/users/profile");

        result.innerHTML = `
            <p>Email: ${response.data.email}</p>
            <h1>Name: ${response.data.name}</h1>
        `
    }
    catch(error){
        console.log(error)
    }
    finally{
        handleLoading(false, $container)
    }
}


loadProfileData();