import { deletePostAPI, likePostAPI, setPostsAPI } from "../api/api"
import { createPostAPI, updatePostAPI } from './../api/api';

const SET_POSTS = "SET_POSTS"
const CREATE_POST = "CREATE_POST"
const DELETE_POST = "DELETE_POST"
const UPDATE_POST = "UPDATE_POST"
const LIKE_POST = "LIKE_POST"

let initialtstae = {
  posts: []
}

export const postsReducer = (state = initialtstae, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case DELETE_POST:
      let newPosts = state.posts.filter(p => p._id !== action.payload)
      return {
        ...state,
        posts: newPosts
      }
    case LIKE_POST:
      let newState = { ...state }
      let likePost = newState.posts.find(p => p._id === action.payload.postId)
      !likePost.likes.includes(action.payload.userId)
        ? likePost.likes.push(action.payload.userId)
        : likePost.likes.filter(u => u._id !== action.payload.userId)

      return {
        ...newState
      }
    case UPDATE_POST:
      let updatePost = state.posts.find(p => p._id === action.payload.postId)

      updatePost.photo = action.payload.data.photo
      updatePost.title = action.payload.data.title
      updatePost.desc = action.payload.data.desc
      updatePost.category = action.payload.data.category

      return {
        ...state
      }
    default:
      return state
  }
}

export const setPostsAC = (posts) => { return { type: SET_POSTS, payload: posts } }
export const createPostAC = (data) => { return { type: CREATE_POST, payload: data } }
export const deletePostAC = (postId) => { return { type: DELETE_POST, payload: postId } }
export const updatePostAC = (postId, data) => { return { type: UPDATE_POST, payload: { postId, data } } }
export const likePostAC = (postId, userId) => { return { type: LIKE_POST, payload: { postId, userId } } }

export const setPostsThunk = () => async dispatch => {
  try {
    let res = await setPostsAPI()
    dispatch(setPostsAC(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const createPostThunk = (data) => async dispatch => {
  try {
    let res = await createPostAPI(data)
    dispatch(createPostAC(res.data.post))
  } catch (e) {
    console.log(e.message)
  }
}

export const likePostThunk = (postId, userId) => async dispatch => {
  try {
    await likePostAPI(postId)
    dispatch(likePostAC(postId, userId))
  } catch (e) {
    console.log(e)
  }
}

export const deletePostThunk = (postId, author) => async dispatch => {
  try {
    await deletePostAPI(postId, author)
    dispatch(deletePostAC(postId))
  } catch (e) {
    console.log(e)
  }
}

export const updatePostThunk = (postId, data, author) => async dispatch => {
  try {
    await updatePostAPI(postId, data, author)
    dispatch(updatePostAC(postId, data))
  } catch (e) {
    console.log(e)
  }
}