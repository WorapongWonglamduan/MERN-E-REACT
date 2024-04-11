import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rootReducers = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducers;
