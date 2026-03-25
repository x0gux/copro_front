import axios from "axios";


const AXIOS = axios.create({
    baseURL : "https://heodongun.com/webhook/piuno",
    headers : {
        "Content-Type" : "application/json"
    }
})

export default AXIOS