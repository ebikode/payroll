import {
  UPDATE_ACCOUNTS,
  UPDATE_ACCOUNTS_STATUS
} from "../action-types/account.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  accounts: {
    iDs: [],
    byIDs: {} // holds accounts with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_ACCOUNTS_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_ACCOUNTS: {
      const {
        isSuccess,
        isLoading,
        message,
        data,
        nextPage,
        currentPage
      } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        nextPage: nextPage,
        currentPage: currentPage,
        accounts: data
      };
    }
    default:
      return state;
  }
}
