import axios from 'axios';

const instance = axios.create({
    baseurl: "https://jsonplaceholder.typicode.com/todos/1";
})

export default instance;

// currently unused. may use env variable instead