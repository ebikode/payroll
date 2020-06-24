import {
  ADD_SALARY,
  UPDATE_SALARY,
  UPDATE_SALARIES,
  UPDATE_SALARIES_STATUS
} from "../action-types/salary.actionTypes";
import { getRequest, postRequest, putRequest } from "../utils/service";
import { processData, processErrorMessage } from "../utils/helpers";

// Process Salary Update action
export const getSalariesAction = (dispatch, page = 1, isAdmin = false) => {
  dispatch({
    type: UPDATE_SALARIES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Salaries..."
    }
  });

  let url = `employee/salary?page=${page}&limit=20`;

  if (isAdmin) url = `admin/salary?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let salaries = processData(res.data.salaries);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_SALARIES,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: salaries
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SALARIES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Salaries..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Create Salary
export const createSalaryAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_SALARIES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Creating Salaries..."
    }
  });

  let url = "admin/manager/salary";

  await postRequest(url, serverPayload, true)
    .then(res => {
      let salaries = res.data.salaries;

      for (let index = 0; index < salaries.length; index++) {
        const salary = salaries[index];

        dispatch({
          type: ADD_SALARY,
          payload: {
            isSuccess: salaries.length === index + 1,
            isLoading: salaries.length !== index + 1,
            message: res.data.message,
            salary: salary
          }
        });
      }
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_SALARIES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while creating Salary", { err });
    });
};

// Update Salary
export const updateSalaryAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_SALARIES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Updating Salary..."
    }
  });

  let url = `admin/manager/salary/${serverPayload.salary_id}`;

  await putRequest(url, serverPayload, true)
    .then(res => {
      let salary = res.data.salary;
      dispatch({
        type: UPDATE_SALARY,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message,
          salary: salary
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_SALARIES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Updating Salary", { err });
    });
};
