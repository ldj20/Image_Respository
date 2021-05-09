import http from "./http-common";

const getImages = () => {
  return http.get("/images");
};

const deleteImages = () => {
  return http.get("/images")
}

export default {
  getImages,
  deleteImages
}