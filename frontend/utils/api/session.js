import axios from "axios";

export const post = (params) => axios.post("/api/session", params);
export const del = (id) => axios.delete("/api/session", id);