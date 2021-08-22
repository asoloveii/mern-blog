import { loginAPI, updateUserAPI } from './../api/api'

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const UPDATE_USER = "UPDATE_USER"

let initialState = {
  isAuth: false,
  user: {} || JSON.parse(localStorage.getItem("token"))
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: {}
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export const loginAC = (user) => { return { type: LOGIN, payload: user } }
export const updateUserAC = (data) => { return { type: UPDATE_USER, payload: data } }
export const logoutAC = () => { return { type: LOGOUT } }

export const loginThunk = (email, password) => async dispatch => {
  try {
    let res = await loginAPI(email, password)
    dispatch(loginAC(res.data.user))
    localStorage.setItem("token", res.data.token)
  } catch (e) {
    console.log(e.message)
  }
}

export const updateUserThunk = (userId, data) => async dispatch => {
  try {
    let res = await updateUserAPI(userId, data)
    dispatch(updateUserAC(res.data.user))
  } catch (e) {
    console.log(e.message)
  }
}