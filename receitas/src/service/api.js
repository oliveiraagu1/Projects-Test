import axios from 'axios';

// json-server --watch -d 180 --host ipv4 db.json
export const api = axios.create({
    baseURL: "http://192.168.0.14:3000",

})
