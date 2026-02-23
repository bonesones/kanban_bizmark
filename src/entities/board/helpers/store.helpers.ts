import type { ColumnModel } from "@/entities/column";
import type { TaskModel } from "@/entities/task";

import type { KanbanBoardModel } from "..";

import type { BoardState } from "../model/store";

export const updateActiveBoard = (
  state: BoardState,
  updater: (board: KanbanBoardModel) => KanbanBoardModel,
) => {
  const nextBoards = state.boards.map((board) =>
    board.id === state.activeBoardId ? updater(board) : board,
  );

  const activeBoard = findActiveBoard(nextBoards, state.activeBoardId);

  return {
    boards: nextBoards,
    board: activeBoard ?? state.board,
  };
};

export const updateTaskInColumn = (
  columns: ColumnModel[],
  columnId: number,
  taskId: number,
  updater: (task: TaskModel) => TaskModel,
) =>
  columns.map((column) =>
    column.id !== columnId
      ? column
      : {
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === taskId ? updater(task) : task,
          ),
        },
  );

export const findActiveBoard = (
  boards: KanbanBoardModel[],
  activeBoardId: number,
): KanbanBoardModel | undefined =>
  boards.find((board) => board.id === activeBoardId);
