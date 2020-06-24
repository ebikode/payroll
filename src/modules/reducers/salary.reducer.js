import {
  UPDATE_SALARIES,
  ADD_SALARY,
  UPDATE_SALARY,
  UPDATE_SALARIES_STATUS
} from "../action-types/salary.actionTypes";
import { getSalaries } from "../selectors/salary.selectors";
import { processData } from "../utils/helpers";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  salaries: {
    iDs: [],
    byIDs: {} // holds salaries with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_SALARIES_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_SALARIES: {
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
        salaries: data
      };
    }
    case ADD_SALARY: {
      const { isSuccess, isLoading, message, salary } = action.payload;

      const salaries = getSalaries(state);

      salaries.unshift(salary);

      let data = processData(salaries);

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        salaries: data
      };
    }
    case UPDATE_SALARY: {
      const { isSuccess, isLoading, message, salary } = action.payload;

      let salaries = state.salaries;

      salaries.byIDs[salary.id] = salary;

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        salaries: salaries
      };
    }
    default:
      return state;
  }
}
