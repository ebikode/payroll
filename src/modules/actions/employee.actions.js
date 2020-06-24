import {
  UPDATE_EMPLOYEES,
  UPDATE_EMPLOYEES_STATUS
} from "../action-types/employee.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

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
