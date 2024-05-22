import axios from "axios";
import authHeader from "../utils/auth-headers";
import signHeader from "../utils/sign-headers";

const API_URL = process.env.API_URL || "http://localhost:8000/";

export const getPublicMedias = (params: string = "") => {
  return axios.get(API_URL + "medias" + params, { headers: { ...authHeader(), ...signHeader() } });
};

export const createMedia = (url: string, title: string, type: string) => {
  if (url === "" || title === "" || type === "") throw new Error("Invalid create media parameters!");
  try {
    const res = axios.post(API_URL + "media", {
      title: title,
      mediaUrl: url,
      type: type,
    }, { headers: { ...authHeader(), ...signHeader() } });

    return res;

  } catch (error) {
    console.error("Error creating media: ", error);
    throw error;
  }
}

export const takeActionOnMedia = (mediaId: string, action: 'like' | 'dislike' | 'neutral') => {
  return axios.post(API_URL + "media/like-unlike", {
    mediaId,
    action,
  }, { headers: { ...authHeader(), ...signHeader() } });

}