import axios from "../api/axios.js";
import { handleLoading } from "../utils/index.js";

const $container = document.querySelector("#container");
const row = document.querySelector("#row")
const updateFrom = document.querySelector("#updateFrom")
const addBtn = document.querySelector("#addBtn");
const name = document.querySelector("#name");
const email = document.querySelector("#email")
const loadProfileData = async () => {

     addBtn.addEventListener("click", () => {
          updateFrom.classList.toggle("show")
     })
    
    try{
        handleLoading(true, $container)
        const response = await axios("/users/profile");
        const data = Object.keys(response.data).map(key => response.data[key])
        const splice = data.splice(0, 3)
        splice.forEach(user => {
          const $td = document.createElement("td")
          $td.innerText = user
          row.append($td)
        })
    }
    catch(error){
        console.log(error)
    }
    finally{
        handleLoading(false, $container)
    }

}


const addFrom = async (e) => {
     e.preventDefault();
     let newName = name.value
     let newEmail = email.value

     try { 
        handleLoading(true, $container) 
        const response = await axios.post("/student/addStudent", {name: newName, email: newEmail})
        console.log(response.data)
        
     } catch (error) {
        console.log(error)
     }
     finally{
        handleLoading(false, $container)
     }

}

updateFrom.addEventListener("submit", addFrom)

loadProfileData();