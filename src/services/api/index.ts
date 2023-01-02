import axios from "axios";

const base =
  import.meta.env.VITE_SERVER_BASE_URL ??
  "http://test-passkeys.regentmarkets.com/api/v1";

console.log(base);

const Api = axios.create({
  baseURL: base,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Api;
