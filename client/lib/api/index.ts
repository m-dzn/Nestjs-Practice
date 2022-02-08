import Axios from "axios";

console.log(process.env.API_BASE_URL);

export const axios = Axios.create({
  baseURL: process.env.API_BASE_URL,
});
