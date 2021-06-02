import http from "./http-common";

const getImages = () => {
  return http.get("/images");
};

export default {
  getImages
}