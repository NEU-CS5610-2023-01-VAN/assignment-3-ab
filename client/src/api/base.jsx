import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
});

// axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}
