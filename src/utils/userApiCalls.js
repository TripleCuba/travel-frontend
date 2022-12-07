import axios from "axios";

const baseUrl = "http://127.0.0.1:1010/accounts/";

export const sendRegistrationForm = async (data) => {
  const resp = await axios.post(`${baseUrl}register/`, data);
  return resp.data;
};
