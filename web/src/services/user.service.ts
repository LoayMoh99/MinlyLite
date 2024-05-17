import axios from "axios";

const API_URL = "http://localhost:8000/";

// TODO - implement the media service
export const getPublicContent = () => {
  return axios.get(API_URL + "test");
};