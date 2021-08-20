import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authReducer } from "./authReducer"
import { postsReducer } from "./postsReducer"

const rootReducers = combineReducers({
  auth: authReducer,
  posts: postsReducer
})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store