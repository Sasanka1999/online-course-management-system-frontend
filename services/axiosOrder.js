import axios from "axios";

const token = localStorage.getItem('ocm-token')

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {Authorization: `Bearer ${token}`}
  });

export default instance;