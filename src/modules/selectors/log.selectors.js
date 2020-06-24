// Get log state from the store
export const getLogState = store => store.log;

// LOG SELECTOR

// Get Log Logs Data State from store
export const getLogsState = store =>
  getLogState(store) ? getLogState(store).logs : {};

// Get Log Logs Data List from store
export const getLogList = store =>
  getLogsState(store) ? getLogsState(store).iDs : [];

// Get Log Logs Data By ID from store
export const getLogsByID = (store, id) =>
  getLogsState(store) ? { ...getLogsState(store).byIDs[id], id } : {};

// Get all logs
export const getLogs = store =>
  getLogList(store).map(id => getLogsByID(store, id));

// Get Selected log
export const getLog = (store, id) => getLogsByID(store, id);

// Get Message
export const getMessage = store =>
  getLogState(store) ? getLogState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getLogState(store) ? getLogState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getLogState(store) ? getLogState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getLogState(store) ? getLogState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getLogState(store) ? getLogState(store).currentPage : 1;
