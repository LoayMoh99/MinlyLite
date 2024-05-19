import axios from "axios";
import authHeader from "./auth.service";

const API_URL = process.env.API_URL || "http://localhost:8000/";

export const getPublicMedias = (params: string = "") => {
  return axios.get(API_URL + "medias" + params, { headers: authHeader() });
};

export const createMedia = (url: string, title: string, type: string) => {
  if (url === "" || title === "" || type === "") throw new Error("Invalid create media parameters!");

  return axios.post(API_URL + "media", {
    title: title,
    mediaUrl: url,
    type: type,
  }, { headers: authHeader() });
}

export const takeActionOnMedia = (mediaId: string, action: 'like' | 'dislike' | 'neutral') => {
  return axios.post(API_URL + "media/like-unlike", {
    mediaId,
    action,
  }, { headers: authHeader() });

}