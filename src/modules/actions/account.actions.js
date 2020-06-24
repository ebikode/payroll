import {
  UPDATE_ACCOUNTS,
  UPDATE_ACCOUNTS_STATUS
} from "../action-types/account.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

// Process Account Update action
export const getAccountsAction = (dispatch, page = 1) => {
  dispatch({
    type: UPDATE_ACCOUNTS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Accounts..."
    }
  });

  let url = `admin/accounts?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let accounts = processData(res.data.accounts);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_ACCOUNTS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: accounts
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_ACCOUNTS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Accounts..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};
