import axios from 'axios';
import 'dotenv/config'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 4000,
  });
export default instance;