import type { BoardState } from "@/entities/board";

export type TaskActions = {
  toggleTaskCompletion: BoardState["toggleTaskCompletion"];
  toggleSubtaskCompletion: BoardState["toggleSubtaskCompletion"];
  startTaskTimer: BoardState["startTaskTimer"];
  stopTaskTimer: BoardState["stopTaskTimer"];
};
