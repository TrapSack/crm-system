export interface IBoard {
  id: string;
  type: "new" | "documents" | "preorder" | "in work" | "final" | string;
  title: string;
  titleColor?: string;
  items: string[];
}
