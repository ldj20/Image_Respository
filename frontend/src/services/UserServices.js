import http from "./http-common";

const create = data => {
  return http.post("/users", data);
};

const login = data => {
  return http.post("/users/login", data);
};

const logout = () => {
  return http.get("/users/logout");
};

const getAuth = () => {
  return http.get("/users/auth");
}

const getImages = () => {
  return http.get("/users/images");
}

const deleteImages = data => {
  return http.post("/users/images", data)
}

export default {
  create,
  login,
  logout,
  getAuth,
  getImages,
  deleteImages
}