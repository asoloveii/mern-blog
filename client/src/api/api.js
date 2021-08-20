import axios from "axios"

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})

export const loginAPI = (email, password) => {
  return axios.post("/auth/login", { email, password })
}

export const registerAPI = (data) => {
  return axios.post("/auth/registration", data)
}

export const setPostsAPI = () => {
  return instance.get("/posts")
}