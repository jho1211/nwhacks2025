import axios from 'axios';
require('dotenv').config()

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 4000,
  });
export default instance;