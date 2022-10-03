import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import theme from "@/config/styles/theme";
import type { IBoard } from "@/models/board";
import { IDeal } from "@/models/single-deal";

import { IInitialState } from "./interfaces";

export const updateBoardsAsync = createAsyncThunk(
  "boards/updateAsync",
  async (data) => {
    return data;
  }
);

const items: IDeal[] = [
  {
    id: "deal-1",
    currency: "BYN",
    price: 50,
    name: "213",
    date: "09-16-22",
    status: "documents",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
  {
    id: "deal-2",
    currency: "BYN",
    price: 50,
    name: "bebra 1221",
    date: "09-16-22",
    status: "final",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
  {
    id: "deal-3",
    currency: "BYN",
    name: "bebra 2",
    date: "09-16-22",
    price: 50,
    status: "in work",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
  {
    id: "deal-4",
    currency: "BYN",
    price: 50,
    name: "bebra3",
    date: "09-16-22",
    status: "preorder",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
  {
    id: "deal-5",
    currency: "BYN",
    name: "21362",
    date: "09-16-22",
    price: 50,
    status: "documents",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
  {
    id: "deal-6",
    currency: "BYN",
    price: 50,
    name: "213",
    date: "09-16-22",
    status: "new",
    client: [
      {
        id: "5",
        name: "sasha",
      },
    ],
  },
];

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
  items: items
    .filter((item) => item.status === board.type)
    .map((item) => item.id),
}));

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: items,
    boards: boards,
    boardsOrder: boards.map((board) => board.id),
  } as IInitialState,
  reducers: {
    updateBoards(state, action: PayloadAction<IInitialState>) {
      return action.payload;
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
  extraReducers(builder) {
    builder.addCase(updateBoardsAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export default boardsSlice.reducer;
export const { updateBoards, addItemToBoard } = boardsSlice.actions;
