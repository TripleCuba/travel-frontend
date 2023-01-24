import { createSlice } from "@reduxjs/toolkit";

const initialUserValue = {
  username: "",
  email: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialUserValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialUserValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
