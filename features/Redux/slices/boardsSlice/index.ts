import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import theme from "@/config/styles/theme";
import type { IBoard } from "@/models/board";
import { IDeal } from "@/models/single-deal";

import { addNotification } from "../notificationSlice";

import { IInitialState } from "./interfaces";

const boards: IBoard[] = [
  { title: "Documents", type: "documents", titleColor: "#B3F08D" },
  {
    title: "New",
    type: "new",
    titleColor: "#F0757B",
  },
  {
    title: "Pre-order",
    type: "preorder",
    titleColor: "#5DC8F0",
  },
  {
    title: "In Work",
    type: "in work",
    titleColor: "#D1B2EE",
  },
].map((board, index) => ({
  id: "col-" + index,
  title: board.title,
  type: board.type,
  titleColor: board.titleColor ?? theme.colors.lightGray1,
  items: [],
}));

export const addBoardAsync = createAsyncThunk(
  "boards/create",
  async (data: { newBoardsOrder: string[]; board: IBoard }, { dispatch }) => {
    dispatch(
      addBoard({ board: data.board, newBoardsOrder: data.newBoardsOrder })
    );
    dispatch(
      addNotification({
        id: nanoid(),
        status: "success",
        title: "Success",
        description: "Column created",
      })
    );
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
    boards: boards,
    boardsOrder: boards.map((board) => board.id),
  } as IInitialState,
  reducers: {
    updateBoards(state, action: PayloadAction<IInitialState>) {
      return action.payload;
    },
    addBoard(
      state,
      action: PayloadAction<{ newBoardsOrder: string[]; board: IBoard }>
    ) {
      return {
        ...state,
        boards: [...state.boards, action.payload.board],
        boardsOrder: action.payload.newBoardsOrder,
      };
    },
    removeBoard(state, action: PayloadAction<{ board: IBoard }>) {
      return {
        items: state.items.filter(
          (item) => item.status !== action.payload.board.type
        ),
        boards: state.boards.filter(
          (board) => board.id !== action.payload.board.id
        ),
        boardsOrder: state.boardsOrder.filter(
          (item) => item !== action.payload.board.id
        ),
      };
    },
    updateBoardTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.id
            ? {
                ...board,
                title: action.payload.title,
              }
            : board
        ),
      };
    },
    addItemToBoard(state, action: PayloadAction<IDeal>) {
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, price: Number(action.payload.price) },
        ],
        boards: state.boards.map((board) =>
          board.type === action.payload.status
            ? { ...board, items: [...board.items, action.payload.id] }
            : board
        ),
      };
    },
  },
});

export default boardsSlice.reducer;
export const {
  updateBoards,
  addItemToBoard,
  addBoard,
  updateBoardTitle,
  removeBoard,
} = boardsSlice.actions;
