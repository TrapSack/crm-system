import { IClient } from "./client";

export interface IDeal {
  id: string;
  price: number;
  name: string;
  date: `${string}-${string}-${string}`;
  currency: string;
  client?: IClient[];
  company?: string[];
  status: "new" | "documents" | "preorder" | "in work" | "final" | string;
}
