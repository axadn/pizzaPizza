import axios from "axios";

export const post = params=> axios.post("/api/users", params);