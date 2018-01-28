import axios from "axios";
export const get = ()=> axios.get("/api/toppings");
export const put = queries=> axios.put("/api/toppings");