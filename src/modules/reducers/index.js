import { combineReducers } from "redux";
import auth from "./auth.reducer.js";
import global from "./global.reducer.js";
import payment from "./payment.reducer.js";
import search from "./search.reducer.js";
import billing from "./billing.reducer.js";
import plan from "./plan.reducer.js";
import account from "./account.reducer.js";
import employee from "./employee.reducer.js";
import setting from "./setting.reducer.js";
import log from "./log.reducer.js";
import token from "./token.reducer.js";

// Combine all Reducers of the application
export default combineReducers({
  global,
  auth,
  payment,
  search,
  billing,
  plan,
  account,
  employee,
  setting,
  log,
  token
});
