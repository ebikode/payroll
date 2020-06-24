import {
  UPDATE_SETTINGS,
  UPDATE_SETTING,
  UPDATE_SETTINGS_STATUS
} from "../action-types/setting.actionTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  settings: {
    keys: [],
    byKeys: {} // holds settings with their s_key as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_SETTINGS_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_SETTINGS: {
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
        settings: data
      };
    }
    case UPDATE_SETTING: {
      const { isSuccess, isLoading, message, setting } = action.payload;

      let settings = state.settings;

      settings.byKeys[setting.s_key] = setting;

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        settings: settings
      };
    }
    default:
      return state;
  }
}
