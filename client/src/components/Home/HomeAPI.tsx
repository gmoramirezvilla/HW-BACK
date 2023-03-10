import axios from "axios";

const API_URL = "http://localhost:3000/auth";

const signup = (email: string, password: string) => {
  return axios.post(API_URL + "/signup", {
    email,
    password
  })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data;
    });
};

const login = (email: string, password: string) => {
  return axios.post(API_URL + "/login", {
    email,
    password
  })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || '{}');
}

export { signup, login, logout, getCurrentUser };