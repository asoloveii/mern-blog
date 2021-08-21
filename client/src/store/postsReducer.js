import { setPostsAPI } from "../api/api"
import { createPostAPI } from './../api/api';

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

    default:
      return state
  }
}

export const setPostsAC = (posts) => { return { type: SET_POSTS, payload: posts } }
export const createPostAC = (data) => { return { type: CREATE_POST, payload: data } }
export const deletePostAC = (postId) => { return { type: DELETE_POST, payload: postId } }
export const updatePostAC = (data) => { return { type: UPDATE_POST, payload: data } }
export const likePostAC = (postId) => { return { type: LIKE_POST, payload: postId } }

export const setPostsThunk = (category) => async dispatch => {
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
    alert(e)
  }
}