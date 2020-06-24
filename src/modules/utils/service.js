import { reactLocalStorage } from "reactjs-localstorage";
import { LOCAL_STORAGE_KEYS } from "../../keys";

import axios from "axios";
import adapter from "axios/lib/adapters/http";

const API_URL = () => process.env.REACT_APP_API_URL;
const APP_KEY = () => process.env.REACT_APP_APP_KEY;

async function getTokenLocalData() {
  const { token } = LOCAL_STORAGE_KEYS;
  var localToken = await reactLocalStorage.get(token, true);
  return localToken;
}

/**
 * @param addToken bool - indicates if the Authorization
 * header preoperty should be added or not
 * @returns Axios request property
 */
const processHeaders = async (addToken = true) => {
  let token = await getTokenLocalData();
  axios.defaults.adapter = adapter;
  if (addToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.headers.common["AppKey"] = APP_KEY();
  return axios;
};

/**
 * Sends POST Request to the server
 * @param payload object - payload added to the request
 * @param addToken bool - indicates if the Authorization
 * header preoperty should be added or not
 * @returns Async Axios request response
 */
export const postRequest = async (endpoint, payload, addToken) => {
  let newAxios = await processHeaders(true);

  let url = `${API_URL()}${endpoint}`;
  // console.log(url)

  return newAxios.post(url, payload);
};

/**
 * Sends PUT Request to the server
 * @param payload object - payload added to the request
 * @param addToken bool - indicates if the Authorization
 * header preoperty should be added or not
 * @returns Async Axios request response
 */
export const putRequest = async (endpoint, payload, addToken) => {
  let newAxios = await processHeaders(true);

  let url = `${API_URL()}${endpoint}`;
  // console.log(url)

  return newAxios.put(url, payload);
};

/**
 * Get all active countries from the server
 * @param endpoint string - the url endpoint of the request
 * @param addToken bool - indicates if the Authorization
 * header preoperty should be added or not
 * @returns async Axios request response
 */
export const getRequest = async (endpoint, addToken) => {
  let newAxios = await processHeaders(addToken);

  let url = `${API_URL()}${endpoint}`;
  // console.log(url)

  return newAxios.get(url);
};
