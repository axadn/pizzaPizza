import axios from "axios";

export const post = (params) => axios.post("/api/session", params);
export const del = () => axios.delete("/api/session");