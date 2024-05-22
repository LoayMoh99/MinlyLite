import axios from "axios";
import signHeader from "../utils/sign-headers";

const API_URL = process.env.API_URL || "http://localhost:8000/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "auth/sign-up", {
    firstName: username,
    email,
    password,
  }, { headers: signHeader() });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "auth/sign-in", {
      email: email,
      password: password,
    }, { headers: signHeader() })
    .then((response) => {
      console.log('Login response ', response.data.data)
      if (response.data.data.accessToken) {
        localStorage.setItem("usertoken", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

export const verifyUser = (token: string) => {
  return axios.get(API_URL + "user/verification/" + token, { headers: signHeader() })
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
