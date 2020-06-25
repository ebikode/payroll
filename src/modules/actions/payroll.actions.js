import {
  UPDATE_PAYROLLS,
  UPDATE_PAYROLLS_STATUS,
  UPDATE_REPORTS,
  UPDATE_FILTERS
} from "../action-types/payroll.actionTypes";
import { getRequest, putRequest } from "../utils/service";
import {
  processData,
  processByMonthData,
  processErrorMessage
} from "../utils/helpers";

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
      var isPayrollPending = false;
      let payrolls = processData(res.data.payrolls);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      for (let index = 0; index < res.data.payrolls.length; index++) {
        const element = res.data.payrolls[index];
        if (element.status === "pending") {
          isPayrollPending = true;
          break;
        }
      }

      dispatch({
        type: UPDATE_PAYROLLS,
        payload: {
          isSuccess: true,
          isLoading: false,
          isPayrollPending: isPayrollPending,
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

// Update Employee
export const approvePayrollAction = async (dispatch, month, year) => {
  dispatch({
    type: UPDATE_PAYROLLS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Running Approval..."
    }
  });

  let serverPayload = {
    month: Number(month),
    year: Number(year),
    status: "approved"
  };

  let url = `admin/manager/payrolls/update/status`;

  await putRequest(url, serverPayload, true)
    .then(res => {
      getPayrolls(dispatch, 1, month, year, true);
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_PAYROLLS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Approving Payrolls", { err });
    });
};
