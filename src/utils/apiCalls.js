import axios from "axios";

const BASE_URL = "http://127.0.0.1:1010";

export const getDestinations = async () => {
  const resp = await axios.get(`${BASE_URL}/destinations`);
  return resp.data;
};

export const getDestination = async (id) => {
  const resp = await axios.get(`${BASE_URL}/destination/${id}`);
  return resp.data;
};

export const getTowns = async (id) => {
  const resp = await axios.get(`${BASE_URL}/towns/${id}`);
  return resp.data;
};
