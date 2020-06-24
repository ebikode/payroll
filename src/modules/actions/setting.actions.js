import {
  UPDATE_SETTING,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_STATUS
} from "../action-types/setting.actionTypes";
import { getRequest, putRequest } from "../utils/service";
import { processSettingsData, processErrorMessage } from "../utils/helpers";

// Process Setting Update action
export const getSettingsAction = async (
  dispatch,
  page = 1,
  isAdmin = false
) => {
  dispatch({
    type: UPDATE_SETTINGS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Settings..."
    }
  });

  let url = `customer/app_settings`;

  if (isAdmin) url = `admin/app_settings`;

  getRequest(url, true)
    .then(res => {
      let settings = processSettingsData(res.data.app_settings);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_SETTINGS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: settings
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SETTINGS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Settings..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Update Setting
export const updateSettingAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_SETTINGS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Updating Setting..."
    }
  });

  let url = `admin/owner/app_settings/${serverPayload.setting_id}`;

  await putRequest(url, serverPayload, true)
    .then(res => {
      dispatch({
        type: UPDATE_SETTING,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message,
          setting: res.data.app_setting
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_SETTINGS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Updating Setting", { err });
    });
};
