import axios from 'axios';
require('dotenv').config()

const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000,
  });
export default instance;