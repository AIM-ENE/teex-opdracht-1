// `src/restGateway/FetchStrategies.js`
import axios from "axios";

const axiosFetch = (url, options) => {
  return axios(url, options)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Axios error:", error);
      throw error;
    });
};

const nativeFetch = (url, options) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export const FetchStrategies = {
  axios: axiosFetch,
  fetch: nativeFetch,
};