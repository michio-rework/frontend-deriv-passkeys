import axios from "axios";

const base = import.meta.env.SERVER_BASE_URL;

const Api = axios.create({
  baseURL: base,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Api;
