import {
  UPDATE_TAXES,
  UPDATE_TAXES_STATUS
} from "../action-types/tax.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

// Process Salary Update action
export const getTaxesAction = (dispatch, page = 1, isAdmin = false) => {
  dispatch({
    type: UPDATE_TAXES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Taxes..."
    }
  });

  let url = `employee/tax?page=${page}&limit=20`;

  if (isAdmin) url = `admin/taxes?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let taxes = processData(res.data.taxes);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_TAXES,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: taxes
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_TAXES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Taxes..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};
