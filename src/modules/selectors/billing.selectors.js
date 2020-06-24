// Get payment state from the store
export const getBillingState = store => store.billing;

// Get Message
export const getMessage = store =>
  getBillingState(store) ? getBillingState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getBillingState(store) ? getBillingState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getBillingState(store) ? getBillingState(store).isSuccess : false;

// Get Next Page
export const getPayment = store =>
  getBillingState(store) ? getBillingState(store).payment : {};
