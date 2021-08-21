import axios from "axios"

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})

// AUTH

export const loginAPI = (email, password) => {
  return axios.post("/auth/login", { email, password })
}

export const registerAPI = (data) => {
  return axios.post("/auth/registration", data)
}

// USERS

export const updateUser = (userId, data) => {
  return instance.put(`/users/${userId}`, { userId, data })
}

export const deleteUser = (userId) => {
  return instance.delete(`/users/${userId}`, { userId })
}

export const getUser = (username, userId) => {
  return instance.get(`/users/${username}`, { userId })
}

// POSTS

export const setPostsAPI = () => {
  return instance.get("/posts")
}

export const createPostAPI = (data) => {
  return instance.post("/posts", data)
}

export const getPostAPI = (postId) => {
  return instance.get(`/posts/${postId}`)
}

export const updatePostAPI = (postId, data) => {
  return instance.put(`/posts/${postId}`, data)
}

export const deletePostAPI = (postId, author) => {
  return instance.delete(`/posts/${postId}`, { author })
}

export const likePostAPI = (postId) => {
  return instance.put(`/posts/like/${postId}`)
}