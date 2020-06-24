import {
  UPDATE_PAYROLLS,
  UPDATE_PAYROLLS_STATUS,
  UPDATE_REPORTS,
  UPDATE_FILTERS
} from "../action-types/payroll.actionTypes";
import { getRequest } from "../utils/service";
import { processData, processByMonthData } from "../utils/helpers";

// Process Payroll Update action
export const getPayrolls = (
  dispatch,
  page = 1,
  month,
  year,
  isAdmin = false
) => {
  dispatch({
    type: UPDATE_PAYROLLS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Payrolls..."
    }
  });

  let url = `employee/payrolls?page=${page}&limit=20`;

  if (isAdmin) url = `admin/manager/payrolls/by_month/${month}/${year}`;

  getRequest(url, true)
    .then(res => {
      let payrolls = processData(res.data.payrolls);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_PAYROLLS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          selectedMonth: month,
          selectedYear: year,
          nextPage: nextPage,
          currentPage: currentPage,
          data: payrolls
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PAYROLLS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Payrolls..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Process Payroll Update action
export const getPayrollReports = dispatch => {
  dispatch({
    type: UPDATE_PAYROLLS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Payroll Reports..."
    }
  });

  let url = `admin/manager/payrolls/reports`;

  getRequest(url, true)
    .then(res => {
      let reports = processByMonthData(res.data.payroll_reports);

      dispatch({
        type: UPDATE_REPORTS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          data: reports
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PAYROLLS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Payrolls Reports..."
        }
      });
      console.log("An Error Occurred while fetching Payrolls Reports", { err });
    });
};

// Process Payroll Update action
export const getPayrollFilters = dispatch => {
  dispatch({
    type: UPDATE_PAYROLLS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Payroll Filters..."
    }
  });

  let url = `admin/manager/payrolls/filters`;

  getRequest(url, true)
    .then(res => {
      let filters = processByMonthData(res.data.payroll_filters);

      dispatch({
        type: UPDATE_FILTERS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          data: filters
        }
      });

      let filter = res.data.payroll_filters[0];
      getPayrolls(dispatch, 1, filter.month, filter.year, true);
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PAYROLLS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Payrolls Reports..."
        }
      });
      console.log("An Error Occurred while fetching Payrolls Reports", { err });
    });
};
