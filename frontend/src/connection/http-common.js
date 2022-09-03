import axios from "axios"


export default axios.create({
    baseURL: 'http://localhost/startPHP/CRUD',
    headers : {
        'content-type' : 'application/json'
    }
})