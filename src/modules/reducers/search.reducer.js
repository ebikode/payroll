import {
  UPDATE_SEARCHES,
  UPDATE_SEARCHES_STATUS
} from "../action-types/searche.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  searches: {
    iDs: [],
    byIDs: {} // holds searches with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_SEARCHES_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_SEARCHES: {
      const {
        isSuccess,
        isLoading,
        message,
        data,
        nextPage,
        currentPage
      } = action.payload;

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        nextPage: nextPage,
        currentPage: currentPage,
        searches: data
      };
    }
    default:
      return state;
  }
}
