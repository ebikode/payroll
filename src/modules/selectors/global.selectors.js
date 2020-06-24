// Get global state from the store
export const getGlobalState = store => store.global;

// COUNTRY SELECTOR

// Get Global COuntries Data State from store
export const getCountriesState = store =>
  getGlobalState(store) ? getGlobalState(store).countries : {};

// Get Global COuntries Data List from store
export const getCountryList = store =>
  getCountriesState(store) ? getCountriesState(store).iDs : [];

// Get Global COuntries Data By ID from store
export const getCountriesByID = (store, iso) =>
  getCountriesState(store)
    ? { ...getCountriesState(store).byIDs[iso], iso }
    : {};

// Get all Countries
export const getCountries = store =>
  getCountryList(store).map(iso => getCountriesByID(store, iso));

// Get Selected Country
export const getCountry = (store, iso) => getCountriesByID(store, iso);
