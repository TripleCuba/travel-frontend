import axios from "axios";

const BASE_URL = "http://127.0.0.1:1010/manager";

export const add_destination_call = async (token, data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/add_destination/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
};

export const add_town_call = async (token, data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/add_town/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
};
export const add_hotel_call = async (token, data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/add_hotel/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
};
export const add_room_call = async (token, data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/add_room/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
};
