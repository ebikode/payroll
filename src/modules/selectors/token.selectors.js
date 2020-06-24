// Get token state from the store
export const getTokenState = store => store.token;

// TOKEN SELECTOR

// Get Token Tokens Data State from store
export const getTokensState = store =>
  getTokenState(store) ? getTokenState(store).tokens : {};

// Get Token Tokens Data List from store
export const getTokenList = store =>
  getTokensState(store) ? getTokensState(store).iDs : [];

// Get Token Tokens Data By ID from store
export const getTokensByID = (store, id) =>
  getTokensState(store) ? { ...getTokensState(store).byIDs[id], id } : {};

// Get all tokens
export const getTokens = store =>
  getTokenList(store).map(id => getTokensByID(store, id));

// Get Selected token
export const getToken = (store, id) => getTokensByID(store, id);

// Get Message
export const getMessage = store =>
  getTokenState(store) ? getTokenState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getTokenState(store) ? getTokenState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getTokenState(store) ? getTokenState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getTokenState(store) ? getTokenState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getTokenState(store) ? getTokenState(store).currentPage : 1;
