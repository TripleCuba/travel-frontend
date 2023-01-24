import axios from "axios";

const baseUrl = "http://127.0.0.1:1010/accounts/";

export const sendRegistrationForm = async (data) => {
  const resp = await axios.post(`${baseUrl}register/`, data);
  return resp.data;
};
export const sendLoginForm = async (data) => {
  const resp = await axios.post(`${baseUrl}login/`, data);
  return resp.data;
};

export const getUserData = async (token) => {
  try {
    const resp = await axios.get(`${baseUrl}get_user/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return resp.data;
  } catch (err) {
    const resp = err;
    return resp.request.status;
  }
};

export const getProfileData = async (token) => {
  try {
    const resp = await axios.get(`${baseUrl}get_profile/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return resp.data;
  } catch (err) {
    const resp = err;
    return resp;
  }
};
export const updateProfile = async (token, data) => {
  try {
    const resp = await axios.patch(`${baseUrl}update_profile/`, data, {
      headers: { Authorization: `Token ${token}` },
    });
    return resp.data;
  } catch (err) {
    const resp = err;
    return resp.request.status;
  }
};

export const updateProfileImg = async (token, data) => {
  try {
    const resp = await axios.patch(`${baseUrl}update_profile_img/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
};
