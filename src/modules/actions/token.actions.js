import {
  UPDATE_TOKENS,
  UPDATE_TOKENS_STATUS
} from "../action-types/token.actionTypes";
import { getRequest, postRequest } from "../utils/service";
import { processData, processErrorMessage } from "../utils/helpers";

// Process Token Update action
export const getTokensAction = async (dispatch, page = 1) => {
  dispatch({
    type: UPDATE_TOKENS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Tokens..."
    }
  });

  let url = `admin/token?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let tokens = processData(res.data.tokens);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_TOKENS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: tokens
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_TOKENS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Tokens..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Create Token
export const createTokenAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_TOKENS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Creating Token..."
    }
  });

  let url = "admin/editor/token";

  await postRequest(url, serverPayload, true)
    .then(async () => {
      dispatch({
        type: UPDATE_TOKENS_STATUS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "Token Generated and Sent to Customer"
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_TOKENS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while creating Token", { err });
    });
};
