// Get account state from the store
export const getAccountState = store => store.account;

// ACCOUNT SELECTOR

// Get Account Accounts Data State from store
export const getAccountsState = store =>
  getAccountState(store) ? getAccountState(store).accounts : {};

// Get Account Accounts Data List from store
export const getAccountList = store =>
  getAccountsState(store) ? getAccountsState(store).iDs : [];

// Get Account Accounts Data By ID from store
export const getAccountsByID = (store, id) =>
  getAccountsState(store) ? { ...getAccountsState(store).byIDs[id], id } : {};

// Get all accounts
export const getAccounts = store =>
  getAccountList(store).map(id => getAccountsByID(store, id));

// Get Selected account
export const getAccount = (store, id) => getAccountsByID(store, id);

// Get Message
export const getMessage = store =>
  getAccountState(store) ? getAccountState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getAccountState(store) ? getAccountState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getAccountState(store) ? getAccountState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getAccountState(store) ? getAccountState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getAccountState(store) ? getAccountState(store).currentPage : 1;
