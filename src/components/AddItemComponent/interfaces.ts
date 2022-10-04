import { IClient } from "@/models/client";

export interface IFormDeal {
  id: string;
  price: string;
  name: string;
  date: `${string}-${string}-${string}`;
  currency: string;
  clients?: IClient[];
  company?: string[];
  status: "new" | "documents" | "preorder" | "in work" | "final" | string;
}
