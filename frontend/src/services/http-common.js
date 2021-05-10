import axios from 'axios';
require('dotenv').config();

const http = axios.create({
  baseURL: "https://lj-shopify-image.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
});

export default http