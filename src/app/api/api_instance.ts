import axios from "axios";

const instance = axios.create({
  baseURL: "https://multisystem.pythonanywhere.com/api",
});

export default instance;
