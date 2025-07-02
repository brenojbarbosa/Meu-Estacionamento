import axios from "axios";

export const api = axios.create({
  baseURL: "http://177.153.58.12:11000",
  headers: {
    "Content-Type": "application/json",
  },
});

