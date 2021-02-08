import { combineReducers } from "redux";
import appReducer from "./appReducer.js";
import userReducer from "./userReducer.js";
import companyReducer from "./companyReducer.js";
import surveyReducer from "./surveyReducer.js";
import socketReducer from "./socketReducer.js";

export const rootReducer = combineReducers({
  appState: appReducer,
  userState: userReducer,
  companyState: companyReducer,
  surveyState: surveyReducer,
  socketState: socketReducer
});
