import {
  UPDATE_LOGS,
  UPDATE_LOGS_STATUS
} from "../action-types/log.actionTypes";
import { getRequest } from "../utils/service";
import { processData } from "../utils/helpers";

// Process Activity Logs Update action
export const getLogsAction = (dispatch, page = 1) => {
  dispatch({
    type: UPDATE_LOGS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Activity Logs..."
    }
  });

  let url = `admin/super_admin/activity_log?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let logs = processData(res.data.activity_logs);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_LOGS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: logs
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_LOGS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Activity Logs..."
        }
      });
      console.log("An Error Occurred while fetching Activity Logs", { err });
    });
};
