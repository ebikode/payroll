// Get salary state from the store
export const getSalaryState = store => store.salary;

// SALARY SELECTOR

// Get Salaries Data State from store
export const getSalariesState = store =>
  getSalaryState(store) ? getSalaryState(store).salaries : {};

// Get Salaries Data List from store
export const getSalaryList = store =>
  getSalariesState(store) ? getSalariesState(store).iDs : [];

// Get Salaries Data By ID from store
export const getSalariesByID = (store, id) =>
  getSalariesState(store) ? { ...getSalariesState(store).byIDs[id], id } : {};

// Get all salaries
export const getSalaries = store =>
  getSalaryList(store).map(id => getSalariesByID(store, id));

// Get Selected salary
export const getSalary = (store, id) => getSalariesByID(store, id);

// Get Message
export const getMessage = store =>
  getSalaryState(store) ? getSalaryState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getSalaryState(store) ? getSalaryState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getSalaryState(store) ? getSalaryState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getSalaryState(store) ? getSalaryState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getSalaryState(store) ? getSalaryState(store).currentPage : 1;
