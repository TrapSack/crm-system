import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: {
    id: "",
    name: "",
    isAuth: true,
    loading: true,
  },
  name: "user",
  reducers: {
    setIsAuth(state) {
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    },
  },
});

export default userSlice.reducer;

export const { setIsAuth } = userSlice.actions;
