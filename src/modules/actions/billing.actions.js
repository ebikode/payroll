import {
  UPDATE_BILLING,
  UPDATE_BILLING_STATUS,
  POINT_PURCHASE,
  SETUP_FEE
} from "../action-types/billing.actionTypes";
import { postRequest } from "../utils/service";
import { getAccounts } from "./auth.actions";
import { processErrorMessage } from "../utils/helpers";

export const resetStatus = dispatch => {
  dispatch({
    type: UPDATE_BILLING_STATUS,
    payload: {
      isSuccess: false,
      isLoading: false,
      message: ""
    }
  });
};

// Process Verify Payment action
export const verifyPayment = async (dispatch, serverPayload, paymentType) => {
  dispatch({
    type: UPDATE_BILLING_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Verifying Payment..."
    }
  });

  // console.log({ serverPayload });
  // console.log({ paymentType });

  var url = "";
  switch (paymentType) {
    case POINT_PURCHASE:
      url = "customer/payments/points";
      break;
    case SETUP_FEE:
      url = "customer/payments";
      break;
    default:
      break;
  }

  await postRequest(url, serverPayload, true)
    .then(async paymentResponse => {
      await getAccounts(dispatch).then(() => {
        dispatch({
          type: UPDATE_BILLING,
          payload: {
            isSuccess: true,
            isLoading: false,
            message: paymentResponse.data.message,
            data: paymentResponse.data.payment
          }
        });
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_BILLING_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};
