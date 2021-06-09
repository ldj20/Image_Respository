import axios from 'axios';
require('dotenv').config();

const http = axios.create({
  baseURL: "https://lj-image-storage.herokuapp.com/api",
  //baseURL: "http://localhost:8989/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
});

export default http