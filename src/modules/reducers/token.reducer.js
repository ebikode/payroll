import {
  UPDATE_TOKENS,
  ADD_TOKEN,
  UPDATE_TOKENS_STATUS
} from "../action-types/token.actionTypes";
import { getTokens } from "../selectors/token.selectors";
import { processData } from "../utils/helpers";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  tokens: {
    iDs: [],
    byIDs: {} // holds tokens with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_TOKENS_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_TOKENS: {
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
        tokens: data
      };
    }
    case ADD_TOKEN: {
      const { isSuccess, isLoading, message, token } = action.payload;

      const tokens = getTokens(state);

      tokens.unshift(token);

      let data = processData(tokens);

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        tokens: data
      };
    }
    default:
      return state;
  }
}
