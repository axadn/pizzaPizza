import axios from "axios";
export const get = ()=> axios.get("/api/sizes");
export const put = queries=> axios.put("/api/sizes");