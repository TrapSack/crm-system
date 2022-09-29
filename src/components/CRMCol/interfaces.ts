import { IBoard } from "@/models/board";
import { IDeal } from "@/models/single-deal";

export interface ICRMColProps {
  board: IBoard;
  items: IDeal[];
  index: number;
}
