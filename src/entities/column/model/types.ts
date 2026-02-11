import type { Task } from "@/entities/task/model";

export type Column = {
  id: number;
  name: string;
  tasks: Task[];
};
