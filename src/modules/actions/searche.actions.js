import {
  UPDATE_SEARCHES,
  UPDATE_SEARCHES_STATUS
} from "../action-types/searche.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

// Process Searche Update action
export const getSearchesAction = (dispatch, accountID, page = 1) => {
  dispatch({
    type: UPDATE_SEARCHES_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Searches..."
    }
  });

  let url = `customer/search/keywords/${accountID}?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let searches = processData(res.data.keywords);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_SEARCHES,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: searches
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SEARCHES_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Searches..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};
