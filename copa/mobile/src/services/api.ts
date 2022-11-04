import axios from "axios";

export const api = axios.create({
  // se for no IOS funciona o localhost
  // se for Androind nao funciona, preicsa do ip
  baseURL: "http://192.168.0.14:3333",
});
