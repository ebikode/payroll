// Get setting state from the store
export const getSettingState = store => store.setting;

// PLAN SELECTOR

// Get Setting Settings Data State from store
export const getSettingsState = store =>
  getSettingState(store) ? getSettingState(store).settings : {};

// Get Setting Settings Data List from store
export const getSettingList = store =>
  getSettingsState(store) ? getSettingsState(store).keys : [];

// Get Setting Settings Data By ID from store
export const getSettingsByKey = (store, s_key) =>
  getSettingsState(store)
    ? { ...getSettingsState(store).byKeys[s_key], s_key }
    : {};

// Get all settings
export const getSettings = store =>
  getSettingList(store).map(s_key => getSettingsByKey(store, s_key));

// Get Selected setting
export const getSetting = (store, s_key) => getSettingsByKey(store, s_key);

// Get Message
export const getMessage = store =>
  getSettingState(store) ? getSettingState(store).message : "";
// Get Loading status
export const getLoadingStatus = store =>
  getSettingState(store) ? getSettingState(store).isLoading : false;

// Get Success status
export const getSuccessStatus = store =>
  getSettingState(store) ? getSettingState(store).isSuccess : false;

// Get Next Page
export const getNextPage = store =>
  getSettingState(store) ? getSettingState(store).nextPage : 0;

// Get Current Page
export const getCurrentPage = store =>
  getSettingState(store) ? getSettingState(store).currentPage : 1;
