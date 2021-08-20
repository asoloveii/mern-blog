import { loginAPI } from './../api/api'

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

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
    default:
      return state
  }
}

export const loginAC = (user) => { return { type: LOGIN, payload: user } }
export const logoutAC = () => { return { type: LOGOUT } }

export const loginThunk = (email, password) => async dispatch => {
  let res = await loginAPI(email, password)
  dispatch(loginAC(res.data.user))
  localStorage.setItem("token", res.data.token)
}