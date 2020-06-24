// Get plan state from the store
export const getPlanState = store => store.plan;

// PLAN SELECTOR

// Get Plan Plans Data State from store
export const getPlansState = store =>
  getPlanState(store) ? getPlanState(store).plans : {};

// Get Plan Plans Data List from store
export const getPlanList = store =>
  getPlansState(store) ? getPlansState(store).iDs : [];

// Get Plan Plans Data By ID from store
export const getPlansByID = (store, id) =>
  getPlansState(store) ? { ...getPlansState(store).byIDs[id], id } : {};

// Get all plans
export const getPlans = store =>
  getPlanList(store).map(id => getPlansByID(store, id));

// Get Selected plan
export const getPlan = (store, id) => getPlansByID(store, id);

// Get Message
export const getMessage = store =>
  getPlanState(store) ? getPlanState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getPlanState(store) ? getPlanState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getPlanState(store) ? getPlanState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getPlanState(store) ? getPlanState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getPlanState(store) ? getPlanState(store).currentPage : 1;
