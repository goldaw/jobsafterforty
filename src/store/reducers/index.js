import { combineReducers } from "redux";
import articles from "./articles";
import auth from "./auth";
import feedback from "./feedback";
import leftmenu from "./leftmenu";

const rootReducer = combineReducers({
  articles,
  auth,
  feedback,
  leftmenu
});

export default rootReducer;