import { registerAPI, setPostsAPI } from "../api/api"

const SET_POSTS = "SET_POSTS"

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
    default:
      return state
  }
}

export const setPostsAC = (posts) => { return { type: SET_POSTS, paylaod: posts } }

export const setPostsThunk = (posts) => async dispatch => {
  try {
    let res = await setPostsAPI()
    dispatch(setPostsAC(res.data))
  } catch (e) {
    console.log(e)
  }
}