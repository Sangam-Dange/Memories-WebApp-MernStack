import { combineReducers } from "redux";

import posts from "./postReducer";
import auth from "./auth";

export default combineReducers({
  posts,
  auth
});
