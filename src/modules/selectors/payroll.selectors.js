// Get payroll state from the store
export const getPayrollStore = store => store.payroll;

// PAYROLL SELECTOR

// Get Payrolls Data State from store
export const getPayrollsState = store =>
  getPayrollStore(store) ? getPayrollStore(store).payrolls : {};

// Get Payrolls Data List from store
export const getPayrollList = store =>
  getPayrollsState(store) ? getPayrollsState(store).iDs : [];

// Get Payrolls Data By ID from store
export const getPayrollsByID = (store, id) =>
  getPayrollsState(store) ? { ...getPayrollsState(store).byIDs[id], id } : {};

// Get all payrolls
export const getPayrolls = store =>
  getPayrollList(store).map(id => getPayrollsByID(store, id));

// Get Selected payroll
export const getPayroll = (store, id) => getPayrollsByID(store, id);

// Get Payroll Reports Data State from store
export const getPayrollReportsState = store =>
  getPayrollStore(store) ? getPayrollStore(store).payrollReports : {};

// Get Payroll Reports Data List from store
export const getPayrollReportList = store =>
  getPayrollReportsState(store) ? getPayrollReportsState(store).months : [];

// Get Payroll Reports Data By ID from store
export const getPayrollReportsByMonth = (store, month) =>
  getPayrollReportsState(store)
    ? { ...getPayrollReportsState(store).byMonths[month], month }
    : {};

// Get all payroll Reports
export const getPayrollReports = store =>
  getPayrollReportList(store).map(month =>
    getPayrollReportsByMonth(store, month)
  );

// Get Payroll Filters Data State from store
export const getPayrollFiltersState = store =>
  getPayrollStore(store) ? getPayrollStore(store).payrollFilters : {};

// Get Payroll Filters Data List from store
export const getPayrollFilterList = store =>
  getPayrollFiltersState(store) ? getPayrollFiltersState(store).months : [];

// Get Payroll Filters Data By ID from store
export const getPayrollFiltersByMonth = (store, month) =>
  getPayrollFiltersState(store)
    ? { ...getPayrollFiltersState(store).byMonths[month], month }
    : {};

// Get all payroll Filters
export const getPayrollFilters = store =>
  getPayrollFilterList(store).map(month =>
    getPayrollFiltersByMonth(store, month)
  );

// Get Message
export const getMessage = store =>
  getPayrollStore(store) ? getPayrollStore(store).message : "";

// Get Loading status
export const getLoadingStatus = store =>
  getPayrollStore(store) ? getPayrollStore(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getPayrollStore(store) ? getPayrollStore(store).isSuccess : false;

// Get Payroll status
export const getPayrollStatus = store =>
  getPayrollStore(store) ? getPayrollStore(store).isPayrollPending : false;

// Get Next Page
export const getNextPage = store =>
  getPayrollStore(store) ? getPayrollStore(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getPayrollStore(store) ? getPayrollStore(store).currentPage : 1;

// Get Selected Month
export const getSelectedMonth = store =>
  getPayrollStore(store) ? getPayrollStore(store).selectedMonth : "";

// Get Selected Year
export const getSelectedYear = store =>
  getPayrollStore(store) ? getPayrollStore(store).selectedYear : "";
