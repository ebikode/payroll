import {
  UPDATE_PAYROLLS,
  UPDATE_PAYROLLS_STATUS,
  UPDATE_REPORTS,
  UPDATE_FILTERS
} from "../action-types/payroll.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isPayrollPending: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  selectedMonth: "",
  selectedYear: "",
  payrollFilters: {
    months: [],
    byMonths: {} // holds payroll filters with their month as key
  },
  payrollReports: {
    months: [],
    byMonths: {} // holds payroll reports with their month as key
  },
  payrolls: {
    iDs: [],
    byIDs: {} // holds payrolls with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_PAYROLLS_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_PAYROLLS: {
      const {
        isSuccess,
        isLoading,
        message,
        isPayrollPending,
        selectedMonth,
        selectedYear,
        data,
        nextPage,
        currentPage
      } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        isPayrollPending: isPayrollPending,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
        nextPage: nextPage,
        currentPage: currentPage,
        payrolls: data
      };
    }
    case UPDATE_REPORTS: {
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
        payrollReports: data
      };
    }
    case UPDATE_FILTERS: {
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
        payrollFilters: data
      };
    }
    default:
      return state;
  }
}
