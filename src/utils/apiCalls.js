import axios from "axios";

const BASE_URL = "http://127.0.0.1:1010";

export const getDestinations = async () => {
  const resp = await axios.get(`${BASE_URL}/destination_list`);
  return resp.data;
};

export const getDestination = async (id) => {
  const resp = await axios.get(`${BASE_URL}/destination/${id}`);
  return resp.data;
};

export const getAllTowns = async () => {
  const resp = await axios.get(`${BASE_URL}/all_towns/`);
  return resp.data;
};

export const getTowns = async (id) => {
  const resp = await axios.get(`${BASE_URL}/town_list/${id}`);
  return resp.data;
};

export const getTown = async (id) => {
  const resp = await axios.get(`${BASE_URL}/town/${id}`);
  return resp.data;
};

export const getAllHotels = async (id) => {
  const resp = await axios.get(`${BASE_URL}/all_hotels/`);
  return resp.data;
};

export const getHotels = async (id) => {
  const resp = await axios.get(`${BASE_URL}/hotel_list/${id}`);
  return resp.data;
};
export const getHotel = async (id) => {
  const resp = await axios.get(`${BASE_URL}/hotel/${id}`);
  return resp.data;
};

export const getRooms = async (id) => {
  const resp = await axios.get(`${BASE_URL}/room_list/${id}`);
  return resp.data;
};
export const getRoom = async (id) => {
  const resp = await axios.get(`${BASE_URL}/room/${id}`);
  return resp.data;
};

export const getReservations = async (token) => {
  const resp = await axios.get(`${BASE_URL}/reservations/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return resp.data;
};
export const reserveRoom = async (id, token, guests, totalPrice) => {
  const resp = await axios.post(
    `${BASE_URL}/reserveRoom/${id}`,
    { guests: guests, totalPrice: totalPrice },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return resp.data;
};
export const cancelOrder = async (id, token) => {
  const resp = await axios.delete(
    `${BASE_URL}/cancelReservation/${id}`,

    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return resp.data;
};
