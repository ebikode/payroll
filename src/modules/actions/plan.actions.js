import {
  ADD_PLAN,
  UPDATE_PLAN,
  UPDATE_PLANS,
  UPDATE_PLANS_STATUS
} from "../action-types/plan.actionTypes";
import { getRequest, postRequest, putRequest } from "../utils/service";
import { processData, processErrorMessage } from "../utils/helpers";

// Process Plan Update action
export const getPlansAction = (dispatch, page = 1, isAdmin = false) => {
  dispatch({
    type: UPDATE_PLANS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Fetching Plans..."
    }
  });

  let url = `customer/plan?page=${page}&limit=20`;

  if (isAdmin) url = `admin/plans?page=${page}&limit=20`;

  getRequest(url, true)
    .then(res => {
      let plans = processData(res.data.plans);

      let nextPage = res.data.next_page;
      let currentPage = res.data.current_page;

      dispatch({
        type: UPDATE_PLANS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: "",
          nextPage: nextPage,
          currentPage: currentPage,
          data: plans
        }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: "Error Fetching Plans..."
        }
      });
      console.log("An Error Occurred while fetching App Settings", { err });
    });
};

// Create Plan
export const createPlanAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_PLANS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Creating Plans..."
    }
  });

  let url = "admin/editor/plan";

  await postRequest(url, serverPayload, true)
    .then(res => {
      let plans = res.data.plans;

      for (let index = 0; index < plans.length; index++) {
        const plan = plans[index];

        dispatch({
          type: ADD_PLAN,
          payload: {
            isSuccess: plans.length === index + 1,
            isLoading: plans.length !== index + 1,
            message: res.data.message,
            plan: plan
          }
        });
      }
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while creating Plan", { err });
    });
};

// Update Plan
export const updatePlanAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_PLANS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Updating Plan..."
    }
  });

  let url = `admin/editor/plan/${serverPayload.plan_id}`;

  await putRequest(url, serverPayload, true)
    .then(res => {
      let plan = res.data.plan;
      dispatch({
        type: UPDATE_PLAN,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message,
          plan: plan
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Updating Plan", { err });
    });
};

// Create Plan Rates
export const createPlanRatesAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_PLANS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Creating Plan Rates..."
    }
  });

  let url = "admin/editor/plan/rate";

  await postRequest(url, serverPayload, true)
    .then(async () => {
      await getPlansAction(dispatch, true, true);
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while creating Plan", { err });
    });
};

// Update Plan Rate
export const updatePlanRateAction = async (dispatch, serverPayload) => {
  dispatch({
    type: UPDATE_PLANS_STATUS,
    payload: {
      isSuccess: false,
      isLoading: true,
      message: "Updating Rate..."
    }
  });

  let url = `admin/editor/plan/rate/${serverPayload.rate_id}`;

  await putRequest(url, serverPayload, true)
    .then(async res => {
      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: true,
          isLoading: false,
          message: res.data.message
        }
      });
    })
    .catch(err => {
      let message = processErrorMessage(err);

      dispatch({
        type: UPDATE_PLANS_STATUS,
        payload: {
          isSuccess: false,
          isLoading: false,
          message: message
        }
      });
      console.log("An Error Occurred while Updating Rate", { err });
    });
};
