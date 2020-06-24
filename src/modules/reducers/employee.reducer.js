import {
  UPDATE_EMPLOYEES,
  UPDATE_EMPLOYEES_STATUS
} from "../action-types/employee.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  employees: {
    iDs: [],
    byIDs: {} // holds employees with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_EMPLOYEES_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_EMPLOYEES: {
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
        employees: data
      };
    }
    default:
      return state;
  }
}
