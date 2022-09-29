import { IBoard } from "@/models/board";
import { IDeal } from "@/models/single-deal";

export interface IInitialState {
  items: IDeal[];
  boards: IBoard[];
  boardsOrder: string[];
}
