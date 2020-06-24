// Get tax state from the store
export const getTaxState = store => store.tax;

// SALARY SELECTOR

// Get Taxes Data State from store
export const getTaxesState = store =>
  getTaxState(store) ? getTaxState(store).taxes : {};

// Get Taxes Data List from store
export const getTaxList = store =>
  getTaxesState(store) ? getTaxesState(store).iDs : [];

// Get Taxes Data By ID from store
export const getTaxesByID = (store, id) =>
  getTaxesState(store) ? { ...getTaxesState(store).byIDs[id], id } : {};

// Get all taxes
export const getTaxes = store =>
  getTaxList(store).map(id => getTaxesByID(store, id));

// Get Selected tax
export const getTax = (store, id) => getTaxesByID(store, id);

// Get Message
export const getMessage = store =>
  getTaxState(store) ? getTaxState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getTaxState(store) ? getTaxState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getTaxState(store) ? getTaxState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getTaxState(store) ? getTaxState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getTaxState(store) ? getTaxState(store).currentPage : 1;
