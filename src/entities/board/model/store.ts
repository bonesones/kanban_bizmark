import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { KanbanBoardModel } from "..";

import { MOCK_COLUMNS } from "../api/mockData";
import {
  findActiveBoard,
  updateActiveBoard,
  updateTaskInColumn,
} from "../helpers/store.helpers";

export type BoardState = {
  boards: KanbanBoardModel[];
  activeBoardId: number;
  board: KanbanBoardModel;

  setActiveBoard: (boardId: number) => void;

  addColumn: (title: string) => void;

  moveTask: (taskId: number, toColumnId: number) => void;

  toggleTaskCompletion: (taskId: number, columnId: number) => void;
  toggleSubtaskCompletion: (
    taskId: number,
    columnId: number,
    subtaskId: number,
  ) => void;

  startTaskTimer: (taskId: number, columnId: number) => void;
  stopTaskTimer: (taskId: number, columnId: number) => void;
};

const INITIAL_BOARD: KanbanBoardModel = {
  id: 1,
  name: "Проект Лиц",
  columns: MOCK_COLUMNS,
  status: "В работе",
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [INITIAL_BOARD],
      activeBoardId: INITIAL_BOARD.id,
      board: INITIAL_BOARD,

      setActiveBoard: (boardId) =>
        set((state) => {
          const activeBoard = findActiveBoard(state.boards, boardId);

          if (!activeBoard) {
            return state;
          }

          return {
            activeBoardId: boardId,
            board: activeBoard,
          };
        }),

      addColumn: (title) =>
        set((state) => {
          const { boards, board } = updateActiveBoard(
            state,
            (currentBoard) => ({
              ...currentBoard,
              columns: [
                ...currentBoard.columns,
                {
                  id: currentBoard.columns.length + 1,
                  name: title,
                  tasks: [],
                },
              ],
            }),
          );

          return {
            boards,
            board,
          };
        }),

      moveTask: (taskId, toColumnId) =>
        set((state) => {
          const { boards, board } = updateActiveBoard(state, (currentBoard) => {
            const columns = currentBoard.columns;

            const fromColumnIndex = columns.findIndex((column) =>
              column.tasks.some((task) => task.id === taskId),
            );

            const toColumnIndex = columns.findIndex(
              (column) => column.id === toColumnId,
            );

            if (fromColumnIndex === -1 || toColumnIndex === -1) {
              return currentBoard;
            }

            if (fromColumnIndex === toColumnIndex) {
              return currentBoard;
            }

            const task = columns[fromColumnIndex].tasks.find(
              (t) => t.id === taskId,
            );

            const newColumns = columns.map((col, index) => {
              if (index === fromColumnIndex) {
                return {
                  ...col,
                  tasks: col.tasks.filter((t) => t.id !== taskId),
                };
              }
              if (index === toColumnIndex && task) {
                return { ...col, tasks: [...col.tasks, task] };
              }
              return col;
            });

            return {
              ...currentBoard,
              columns: newColumns,
            };
          });

          return {
            boards,
            board,
          };
        }),

      toggleTaskCompletion: (taskId, columnId) =>
        set((state) => {
          const { boards, board } = updateActiveBoard(
            state,
            (currentBoard) => ({
              ...currentBoard,
              columns: updateTaskInColumn(
                currentBoard.columns,
                columnId,
                taskId,
                (task) => ({ ...task, isDone: !task.isDone }),
              ),
            }),
          );

          return {
            boards,
            board,
          };
        }),

      toggleSubtaskCompletion: (taskId, columnId, subtaskId) =>
        set((state) => {
          const { boards, board } = updateActiveBoard(
            state,
            (currentBoard) => ({
              ...currentBoard,
              columns: updateTaskInColumn(
                currentBoard.columns,
                columnId,
                taskId,
                (task) => ({
                  ...task,
                  subtasks: task.subtasks.map((subtask) =>
                    subtask.id !== subtaskId
                      ? subtask
                      : { ...subtask, isDone: !subtask.isDone },
                  ),
                }),
              ),
            }),
          );

          return {
            boards,
            board,
          };
        }),

      startTaskTimer: (taskId, columnId) =>
        set((state) => {
          const now = Date.now();

          const { boards, board } = updateActiveBoard(
            state,
            (currentBoard) => ({
              ...currentBoard,
              columns: currentBoard.columns.map((column) => {
                if (column.id !== columnId) {
                  return column;
                }

                return {
                  ...column,
                  tasks: column.tasks.map((task) => {
                    if (task.id === taskId) {
                      return {
                        ...task,
                        timer: {
                          startedAt: now,
                          isRunning: true,
                        },
                      };
                    }
                    return task;
                  }),
                };
              }),
            }),
          );

          return {
            boards,
            board,
          };
        }),

      stopTaskTimer: (taskId, columnId) =>
        set((state) => {
          const now = Date.now();

          const { boards, board } = updateActiveBoard(
            state,
            (currentBoard) => ({
              ...currentBoard,
              columns: currentBoard.columns.map((column) => {
                if (column.id !== columnId) {
                  return column;
                }

                return {
                  ...column,
                  tasks: column.tasks.map((task) => {
                    if (task.id !== taskId || !task.timer.isRunning) {
                      return task;
                    }

                    const diff = now - (task.timer.startedAt ?? now);

                    return {
                      ...task,
                      timeSpent: task.timeSpent + Math.floor(diff / 1000),
                      timer: { startedAt: null, isRunning: false },
                    };
                  }),
                };
              }),
            }),
          );

          return {
            boards,
            board,
          };
        }),
    }),
    {
      name: "kanban-board-storage",
      partialize: (state) => ({
        boards: state.boards,
        activeBoardId: state.activeBoardId,
        board: state.board,
      }),
    },
  ),
);

export const useBoardsList = () =>
  useBoardStore((state) => state.boards.map(({ id, name }) => ({ id, name })));
