import {
  INIT,
  UPDATE,
  UPDATE_AUTH_STATUS,
  LOGOUT
} from "../action-types/auth.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  data: {
    role: "",
    isAdmin: false,
    welcomeMessage: "",
    admin: {},
    employee: {},
    dashboardData: {},
    recentPayrolls: {
      iDs: [],
      byIDs: {} // holds recent users with their id as key
    }
  }
};

export default function(state = initialState, action) {
  // console.log("action.payload", action.payload)
  switch (action.type) {
    case INIT: {
      const { isSuccess, isLoading, message, data } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        data: data
      };
    }
    case UPDATE_AUTH_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE: {
      const { isSuccess, isLoading, message, data } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        data: data
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        message: "",
        data: {}
      };
    }
    default:
      return state;
  }
}
