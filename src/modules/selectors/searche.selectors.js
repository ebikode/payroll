// Get searche state from the store
export const getSearcheState = store => store.search;

// SEARCHE SELECTOR

// Get Searche Searches Data State from store
export const getSearchesState = store =>
  getSearcheState(store) ? getSearcheState(store).searches : {};

// Get Searche Searches Data List from store
export const getSearcheList = store =>
  getSearchesState(store) ? getSearchesState(store).iDs : [];

// Get Searche Searches Data By ID from store
export const getSearchesByID = (store, id) =>
  getSearchesState(store) ? { ...getSearchesState(store).byIDs[id], id } : {};

// Get all searches
export const getSearches = store =>
  getSearcheList(store).map(id => getSearchesByID(store, id));

// Get Selected searche
export const getSearche = (store, id) => getSearchesByID(store, id);

// Get Message
export const getMessage = store =>
  getSearcheState(store) ? getSearcheState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getSearcheState(store) ? getSearcheState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getSearcheState(store) ? getSearcheState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getSearcheState(store) ? getSearcheState(store).nextPage : 1;

// Get Current Page
export const getCurrentPage = store =>
  getSearcheState(store) ? getSearcheState(store).currentPage : 0;
