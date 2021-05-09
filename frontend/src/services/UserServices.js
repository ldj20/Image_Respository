import http from "./http-common.js";

const create = data => {
  return http.post("/users", data);
};

const login = data => {
  return http.post("/users/login", data);
}

const logout = () => {
  return http.post("/users/logout");
};

export default {
  create,
  login,
  logout
}