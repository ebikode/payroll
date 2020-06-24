import {
  UPDATE_PLANS,
  ADD_PLAN,
  UPDATE_PLAN,
  UPDATE_PLANS_STATUS
} from "../action-types/plan.actionTypes";
import { getPlans } from "../selectors/plan.selectors";
import { processData } from "../utils/helpers";

const initialState = {
  isSuccess: false,
  isLoading: false,
  message: "",
  nextPage: 0,
  currentPage: 1,
  plans: {
    iDs: [],
    byIDs: {} // holds plans with their id as key
  },
  planRates: {
    iDs: [],
    byIDs: {} // holds plans rates with their id as key
  }
};

export default function(state = initialState, action) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case UPDATE_PLANS_STATUS: {
      const { isSuccess, isLoading, message } = action.payload;
      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message
      };
    }
    case UPDATE_PLANS: {
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
        plans: data
      };
    }
    case ADD_PLAN: {
      const { isSuccess, isLoading, message, plan } = action.payload;

      const plans = getPlans(state);

      plans.unshift(plan);

      let data = processData(plans);

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        plans: data
      };
    }
    case UPDATE_PLAN: {
      const { isSuccess, isLoading, message, plan } = action.payload;

      let plans = state.plans;

      plans.byIDs[plan.id] = plan;

      return {
        ...state,
        isSuccess: isSuccess,
        isLoading: isLoading,
        message: message,
        plans: plans
      };
    }
    default:
      return state;
  }
}
