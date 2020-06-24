import { UPDATE_COUNTRIES } from "../action-types/global.actionTypes";

const initialState = {
  countries: {
    iDs: [],
    byIDs: {} // holds countries with their ios as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_COUNTRIES: {
      const data = action.payload;
      console.log(data);
      return {
        ...state,
        countries: data
      };
    }
    default:
      return state;
  }
}
