import axios from "axios";
import signHeader from "../utils/sign-headers";

const API_URL = process.env.API_URL || "http://localhost:8000/";
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
});
axiosInstance.interceptors.request.use(
  (config) => {
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

export const register = (username: string, email: string, password: string) => {
  return axiosInstance.post("auth/sign-up", {
    firstName: username,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axiosInstance
    .post("auth/sign-in", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log('Login response ', response.data.data)
      if (response.data.data.accessToken) {
        localStorage.setItem("usertoken", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

export const verifyUser = (token: string) => {
  return axiosInstance.get("user/verification/" + token)
    .then((response) => {
      console.log('Verification response ', response.data.data)
      if (response.data.data.accessToken) {
        localStorage.setItem("usertoken", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("usertoken");
};

export const getCurrentUser = () => {
  const usertoken = localStorage.getItem("usertoken");
  if (usertoken) return JSON.parse(usertoken);

  return null;
};
