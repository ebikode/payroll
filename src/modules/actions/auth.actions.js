import {
  INIT,
  UPDATE,
  UPDATE_AUTH_STATUS,
  LOGOUT
} from "../action-types/auth.actionTypes";
import { getRequest } from "../utils/service";
import { processAuthData, saveDashboardData } from "../utils/helpers";
import { reactLocalStorage } from "reactjs-localstorage";
import { LOCAL_STORAGE_KEYS } from "../../keys";

const { role, admin, employee } = LOCAL_STORAGE_KEYS;

// Process Init Auth Data Actions
export const initAuthStore = async dispatch => {
  let data = await processAuthData();

  dispatch({
    type: INIT,
    payload: { data }
  });
};

// Process Update Actions
export const updateAuthStore = data => ({
  type: UPDATE,
  payload: data
});

// Process Update Status Actions
export const updateAuthStoreStatus = data => ({
  type: UPDATE_AUTH_STATUS,
  payload: data
});

// Process logiut Actions
export const logout = () => ({
  type: LOGOUT
});

export const getAdmin = async () =>
  getRequest("admin/me", true)
    .then(res => {
      let adminData = res.data.admin;
      reactLocalStorage.setObject(admin, adminData);
      saveDashboardData(res.data);
      reactLocalStorage.setObject(role, admin);
    })
    .catch(err => {
      console.log("An Error Occurred while fetching Admin Data", { err });
    });

export const getEmployee = async () =>
  getRequest("employee/me", true)
    .then(res => {
      let employeeData = res.data.employee;
      reactLocalStorage.setObject(employee, employeeData);
      saveDashboardData(res.data);
      reactLocalStorage.setObject(role, employee);
    })
    .catch(err => {
      console.log("An Error Occurred while fetching Employee Data", { err });
    });
