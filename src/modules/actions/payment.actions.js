import {
  UPDATE_PAYMENTS,
  UPDATE_PAYMENTS_STATUS
} from "../action-types/payment.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

// Process Payment Update action
export const getPayments = (dispatch, page = 1, isAdmin = false) => {
  dispatch({
    type: UPDATE_PAYMENTS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Payments..."
    }
  });

  let url = `customer/payments?page=${page}&limit=20`;

  if (isAdmin) url = `admin/sales/payments?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let payments = processData(res.data.payments);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_PAYMENTS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: payments
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PAYMENTS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Payments..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};
