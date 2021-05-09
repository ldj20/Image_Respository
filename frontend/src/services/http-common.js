import axios from 'axios';
require('dotenv').config();

const http = axios.create({
  baseURL: "http://localhost:8989/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default http