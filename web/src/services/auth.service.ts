import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8000/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "sign-up", {
    username,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "auth/sign-in", {
      email: email,
      password: password,
    })
    .then((response) => {
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

export default function authHeader() {
  const usertoken = localStorage.getItem("usertoken");
  let user = null;
  if (usertoken)
    user = JSON.parse(usertoken);

  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken,
      'Content-Type': 'application/json',
    }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {
      Authorization: '',
      'Content-Type': 'application/json',
    }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}