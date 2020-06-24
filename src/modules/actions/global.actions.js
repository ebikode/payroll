import { UPDATE_COUNTRIES } from "../action-types/global.actionTypes";
import { getRequest } from "../utils/service";
import { processCountriesData } from "../utils/helpers";

// Process login Actions
export const updateCountriesStore = data => ({
  type: UPDATE_COUNTRIES,
  payload: data
});

export const getCountriesAction = dispatch => {
  getRequest("countries", false)
    .then(res => {
      // console.log({res});

      let countries = processCountriesData(res.data.countries);

      console.log(countries);
      dispatch({
        type: UPDATE_COUNTRIES,
        payload: countries
      });
    })
    .catch(err => {
      console.log("An Error Occurred while fetching Countries", { err });
    });
};
