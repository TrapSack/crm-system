import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INotification } from "./interfaces";

export const activateNotification = createAsyncThunk(
  "notification/activateNotification",
  async (data: { delay?: number; id: string }, { dispatch }) => {
    await setTimeout(() => {
      dispatch(filterNotification({ id: data.id }));
    }, data.delay ?? 2000);
  }
);

export const filterNotification = createAsyncThunk(
  "notification/filterNotification",
  async (data: { id: string }) => {
    return { id: data.id };
  }
);

const notificationsSlice = createSlice({
  initialState: { notifications: [] as INotification[] },
  name: "notifications",
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      return {
        notifications: [...state.notifications, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      filterNotification.fulfilled,
      (state, action: PayloadAction<{ id: string }>) => {
        state.notifications = state.notifications.filter(
          (note) => note.id !== action.payload.id
        );
      }
    );
  },
});

export default notificationsSlice.reducer;

export const { addNotification } = notificationsSlice.actions;
