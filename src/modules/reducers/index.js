import { combineReducers } from "redux";
import auth from "./auth.reducer.js";
import global from "./global.reducer.js";
import payroll from "./payroll.reducer.js";
import salary from "./salary.reducer.js";
import tax from "./tax.reducer.js";
import employee from "./employee.reducer.js";
import setting from "./setting.reducer.js";
import log from "./log.reducer.js";

// Combine all Reducers of the application
export default combineReducers({
  global,
  auth,
  payroll,
  salary,
  tax,
  employee,
  setting,
  log
});
