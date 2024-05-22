import axios from "axios";
import authHeader from "../utils/auth-headers";
import signHeader from "../utils/sign-headers";
import { logout } from "./auth.service";

const API_URL = process.env.API_URL || "http://localhost:8000/";
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = authHeader();
    config.headers['Signature'] = signHeader();

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx will trigger this function
    // Do something with response data
    console.log('Response: ', response);
    // incase of verification token expired 
    if (response && response.status === 401) {
      logout();
      window.location.reload();
    }
    return response;
  },
  (error) => {
    // incase of verification token expired
    if (error.response && error.response.status === 401) {
      logout();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const getPublicMedias = (params: string = "") => {
  return axiosInstance.get("medias" + params);
};

export const createMedia = (url: string, title: string, type: string) => {
  if (url === "" || title === "" || type === "") throw new Error("Invalid create media parameters!");
  try {
    const res = axiosInstance.post("media", {
      title: title,
      mediaUrl: url,
      type: type,
    });

    return res;

  } catch (error) {
    console.error("Error creating media: ", error);
    throw error;
  }
}

export const takeActionOnMedia = (mediaId: string, action: 'like' | 'dislike' | 'neutral') => {
  return axiosInstance.post("media/like-unlike", {
    mediaId,
    action,
  });

}