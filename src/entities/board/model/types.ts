import type { ColumnModel } from "@/entities/column";

export type KanbanBoard = {
  id: number;
  name: string;
  status: string;
  columns: ColumnModel[];
};
