import { reactLocalStorage } from "reactjs-localstorage";
import { LOCAL_STORAGE_KEYS } from "../../keys";
import Cookies from "js-cookie";

const {
  token,
  role,
  admin,
  employee,
  welcome_message,
  dashboard_data,
  recent_payrolls
} = LOCAL_STORAGE_KEYS;

// Check Authentication
export const checkAuth = () => {
  let savedToken = Cookies.get(token);

  // console.log("savedToken", {savedToken});

  return savedToken;
};

// Check Authentication
export const checkRole = () => {
  let savedRole = Cookies.get(role);

  return savedRole;
};

export const formatCurrency = value => {
  if (value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "NGN"
    });
  }
};

export const months = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};

/**
 * Minimize Figures
 * @param value object - the data object to be processed
 * @param startFromSuffix string - the suffix to start the abbreviation from
 * "K"||"10K"||"100K"||"M"||"10M"||"100M"||"B"||"T"
 * @param isMoney boolean - use to check if the value is an amount
 */
export const minimizeFigures = (value, startFromSuffix, isMoney = false) => {
  if (value && isMoney) value = value.toFixed(2);
  let n = value;
  if (n < 1e3) return n;

  switch (startFromSuffix) {
    case "K":
      if (n > 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "10K":
      if (n >= 1e4 && n < 1e6) return +(n / 1e4).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "100K":
      if (n >= 1e5 && n < 1e6) return +(n / 1e5).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "M":
      if (n > 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "10M":
      if (n >= 1e7 && n < 1e9) return +(n / 1e7).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "100M":
      if (n >= 1e8 && n < 1e9) return +(n / 1e8).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "B":
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    case "T":
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      break;
    default:
      break;
  }
  return n;
};

/**
 * Save the local Dashboard data to local storage
 * @param data object - the data object to be processed
 */
export const saveDashboardData = data => {
  reactLocalStorage.setObject(welcome_message, data.message);
  if (data.dashboard_data) {
    reactLocalStorage.setObject(dashboard_data, data.dashboard_data);
  }
  if (data.recent_payrolls) {
    reactLocalStorage.setObject(recent_payrolls, data.recent_payrolls);
  }
};

/**
 * Get the local saved Admin/Dashboard data and process it
 */
export const processAuthData = async () => {
  const roleData = await reactLocalStorage.get(role, true);
  const welcomeMessage = await reactLocalStorage.get(welcome_message, true);
  const adminData = await reactLocalStorage.getObject(admin, {}, true);
  const employeeData = await reactLocalStorage.getObject(employee, {}, true);
  const dashboardData = await reactLocalStorage.getObject(
    dashboard_data,
    {},
    true
  );
  const recentPayrollsData = await reactLocalStorage.getObject(
    recent_payrolls,
    {},
    true
  );
  const isAdmin = checkRole() === admin;

  let recentPayrollsByIDs = {};

  let recentPayrollsIDs = recentPayrollsData.map(payroll => {
    recentPayrollsByIDs[payroll.id] = payroll;
    return payroll.id;
  });

  const recentPayrollsState = {
    iDs: recentPayrollsIDs,
    byIDs: recentPayrollsByIDs
  };

  console.log("authState", {
    role: roleData,
    isAdmin: isAdmin,
    welcomeMessage: welcomeMessage,
    admin: adminData,
    employee: employeeData,
    dashboardData: dashboardData,
    recentPayrolls: recentPayrollsState
  });

  return {
    role: roleData,
    welcomeMessage: welcomeMessage,
    isAdmin: isAdmin,
    admin: adminData,
    employee: employeeData,
    dashboardData: dashboardData,
    recentPayrolls: recentPayrollsState
  };
};

/**
 * Process countries data and return the object structure of the store
 * @param countriesData Array -
 * @returns object { iDs: [], byIDs: {} }
 */
export const processCountriesData = countriesData => {
  let byIDs = {};
  let iDs = countriesData.map(country => {
    byIDs[country.iso] = country;
    return country.iso;
  });

  const countriesState = {
    iDs: iDs,
    byIDs: byIDs
  };

  return countriesState;
};

/**
 * Process settings data and return the object structure of the store
 * @param data Array -
 * @returns object { keys: [], byKeys: {}}
 */
export const processSettingsData = data => {
  let byKeys = {};

  let keys = data.map(setting => {
    byKeys[setting.s_key] = setting;
    return setting.s_key;
  });

  const settingsState = {
    keys: keys,
    byKeys: byKeys
  };

  return settingsState;
};

/**
 * Process Data and return the object structure of the store
 * @param data Array -
 * @returns object { iDs: [], byIDs: {} }
 */
export const processData = data => {
  let byIDs = {};
  let iDs = data.map(item => {
    byIDs[item.id] = item;
    return item.id;
  });

  const dataState = {
    iDs: iDs,
    byIDs: byIDs
  };

  return dataState;
};

/**
 * Process By Months Data and return the object structure of the store
 * @param data Array -
 * @returns object { months: [], byMonths: {} }
 */
export const processByMonthData = data => {
  let byMonths = {};
  let months = data.map(item => {
    byMonths[item.month] = item;
    return item.month;
  });

  const dataState = {
    months: months,
    byMonths: byMonths
  };

  return dataState;
};

/**
 * Process Error Message Data returned from the server
 * @param err Object -
 * @returns string
 */
export const processErrorMessage = err => {
  var message = "";
  if (err.response) {
    if (err.response.data.message) {
      message = err.response.data.message;
    }

    if (err.response.data.error) {
      var error = err.response.data.error;
      console.log({ error });
      if (error.phone) {
        message = `${message} \n ${error.phone}`;
      }
      if (error.name) {
        message = `${message} \n ${error.name}`;
      }
      if (error.search_plan_id) {
        message = `${message} \n ${error.search_plan_id}`;
      }
      if (error.startup_token) {
        message = `${message} \n ${error.startup_token}`;
      }
      if (error.type) {
        message = `${message} \n ${error.type}`;
      }
      if (error.email) {
        message = `${message} \n ${error.email}`;
      }
      if (error.username) {
        message = `${message} \n ${error.username}`;
      }
      if (error.first_name) {
        message = `${message} \n ${error.first_name}`;
      }
      if (error.last_name) {
        message = `${message} \n ${error.last_name}`;
      }
      if (error.country_iso) {
        message = `${message} \n ${error.country_iso}`;
      }
      if (error.password) {
        message = `${message} \n ${error.password}`;
      }
      if (error.paypal_order_id) {
        message = `${message} \n ${error.paypal_order_id}`;
      }
      if (error.amount_paid) {
        message = `${message} \n ${error.amount_paid}`;
      }
      if (error.account_id) {
        message = `${message} \n ${error.account_id}`;
      }
      if (error.points) {
        message = `${message} \n ${error.points}`;
      }
      if (error.min_point) {
        message = `${message} \n ${error.min_point}`;
      }
      if (error.startup_min_point) {
        message = `${message} \n ${error.startup_min_point}`;
      }
      if (error.include_analytics) {
        message = `${message} \n ${error.include_analytics}`;
      }
      if (error.show_miles_to_cash) {
        message = `${message} \n ${error.show_miles_to_cash}`;
      }
      if (error.allow_price_alert) {
        message = `${message} \n ${error.allow_price_alert}`;
      }
      if (error.search_plan_id) {
        message = `${message} \n ${error.search_plan_id}`;
      }
      if (error.max_point) {
        message = `${message} \n ${error.max_point}`;
      }
      if (error.cost_per_point) {
        message = `${message} \n ${error.cost_per_point}`;
      }
    }
  }

  return message;
};
