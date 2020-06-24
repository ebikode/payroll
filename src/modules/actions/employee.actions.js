import {
  UPDATE_EMPLOYEES,
  UPDATE_EMPLOYEES_STATUS,
  UPDATE_EMPLOYEE
} from "../action-types/employee.actionTypes";
import { getRequest, postRequest, putRequest } from "../utils/service";
import { processData, processErrorMessage } from "../utils/helpers";

// Process Employee Update action
export const getEmployees = (dispatch, page = 1) => {
  dispatch({
    type: UPDATE_EMPLOYEES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Employees..."
    }
  });

  let url = `admin/employees?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let employees = processData(res.data.employees);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_EMPLOYEES,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: employees
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_EMPLOYEES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Employees..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Create Employee
export const createEmployeeAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_EMPLOYEES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Creating Employee..."
    }
  });

  if (serverPayload.password !== serverPayload.confirm_password) {
    dispatch({
      type: UPDATE_EMPLOYEES_STATUS,
      payload: {
        isSuccess: false,
        isLoading: false,
        message: "Password does not match"
      }
    });
    return;
  }

  let url = "admin/manager/employee/create";

  await postRequest(url, serverPayload, true)
    .then(res => {
      dispatch({
        type: UPDATE_EMPLOYEES_STATUS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_EMPLOYEES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while creating Employee", { err });
    });
};

// Update Employee
export const updateEmployeeAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_EMPLOYEES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Updating Employee..."
    }
  });

  let url = `admin/manager/employee/update/${serverPayload.employee_id}`;

  await putRequest(url, serverPayload, true)
    .then(res => {
      let employee = res.data.employee;
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message,
          employee: employee
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_EMPLOYEES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Updating Employee", { err });
    });
};
