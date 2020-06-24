import {
  UPDATE_BILLING,
  UPDATE_BILLING_STATUS
} from "../action-types/billing.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  payment: {}
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_BILLING_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_BILLING: {
      const { isSuccess, isLoading, message, data } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        payment: data
      };
    }
    default:
      return state;
  }
}
