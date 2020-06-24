// Get payment state from the store
export const getPaymentState = store => store.payment;

// PAYMENT SELECTOR

// Get Payment Payments Data State from store
export const getPaymentsState = store =>
  getPaymentState(store) ? getPaymentState(store).payments : {};

// Get Payment Payments Data List from store
export const getPaymentList = store =>
  getPaymentsState(store) ? getPaymentsState(store).iDs : [];

// Get Payment Payments Data By ID from store
export const getPaymentsByID = (store, id) =>
  getPaymentsState(store) ? { ...getPaymentsState(store).byIDs[id], id } : {};

// Get all payments
export const getPayments = store =>
  getPaymentList(store).map(id => getPaymentsByID(store, id));

// Get Selected payment
export const getPayment = (store, id) => getPaymentsByID(store, id);

// Get Message
export const getMessage = store =>
  getPaymentState(store) ? getPaymentState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getPaymentState(store) ? getPaymentState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getPaymentState(store) ? getPaymentState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getPaymentState(store) ? getPaymentState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getPaymentState(store) ? getPaymentState(store).currentPage : 1;
