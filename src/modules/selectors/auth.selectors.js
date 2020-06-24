// Get auth state from the store
export const getAuthState = store => store.auth;

// Get Message
export const getMessage = store =>
  getAuthState(store) ? getAuthState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getAuthState(store) ? getAuthState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getAuthState(store) ? getAuthState(store).isSuccess : false;

// Get Auth Data State from store
export const getAuthDataState = store =>
  getAuthState(store) ? getAuthState(store).data : {};

// Get welcome message status
export const getWelcomeMessage = store =>
  getAuthDataState(store) ? getAuthDataState(store).welcomeMessage : "";

// Get admin status
export const getAdminRole = store =>
  getAuthDataState(store) ? getAuthDataState(store).role : "";

// Get admin status
export const getAdminStatus = store =>
  getAuthDataState(store) ? getAuthDataState(store).isAdmin : false;

// Get Auth Admin Data State from store
export const getAdminState = store =>
  getAuthDataState(store) ? getAuthDataState(store).admin : {};

// Get Auth Employee Data State from store
export const getEmployeeState = store =>
  getAuthDataState(store) ? getAuthDataState(store).employee : {};

// Get Auth Admin Data State from store
export const getDashboardState = store =>
  getAuthDataState(store) ? getAuthDataState(store).dashboardData : {};

// Get Auth recent payrolls Data State from store
export const getRecentPayrollsState = store =>
  getAuthDataState(store) ? getAuthDataState(store).recentPayrolls : {};
// Get Auth new payrolls Data List from store
export const getRecentPayrollsList = store =>
  getRecentPayrollsState(store) ? getRecentPayrollsState(store).iDs : [];
// Get Auth Recent payrolls Data By IDs from store
export const getRecentPayrollsByID = (store, id) =>
  getRecentPayrollsState(store)
    ? { ...getRecentPayrollsState(store).byIDs[id] }
    : {};

// Get all New payrolls
export const getRecentPayrolls = store =>
  getRecentPayrollsList(store).map(id => getRecentPayrollsByID(store, id));
