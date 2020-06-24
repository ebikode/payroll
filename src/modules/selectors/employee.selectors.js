// Get employee state from the store
export const getEmployeeState = store => store.employee;

// EMPLOYEE SELECTOR

// Get Employees Data State from store
export const getEmployeesState = store =>
  getEmployeeState(store) ? getEmployeeState(store).employees : {};

// Get Employees Data List from store
export const getEmployeeList = store =>
  getEmployeesState(store) ? getEmployeesState(store).iDs : [];

// Get Employees Data By ID from store
export const getEmployeesByID = (store, id) =>
  getEmployeesState(store) ? { ...getEmployeesState(store).byIDs[id], id } : {};

// Get all employees
export const getEmployees = store =>
  getEmployeeList(store).map(id => getEmployeesByID(store, id));

// Get Selected employee
export const getEmployee = (store, id) => getEmployeesByID(store, id);

// Get Message
export const getMessage = store =>
  getEmployeeState(store) ? getEmployeeState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getEmployeeState(store) ? getEmployeeState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getEmployeeState(store) ? getEmployeeState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getEmployeeState(store) ? getEmployeeState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getEmployeeState(store) ? getEmployeeState(store).currentPage : 1;
