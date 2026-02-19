import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ColumnModel } from "@/entities/column";
import type { TaskModel } from "@/entities/task";

import type { KanbanBoardModel } from "..";

import { MOCK_COLUMNS } from "../api/mockData";

export type BoardState = {
  board: KanbanBoardModel;
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

const updateTaskInColumn = (
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


export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: {
        id: 1,
        name: "Проект Лиц",
        columns: MOCK_COLUMNS,
        status: "В работе",
      },

      addColumn: (title) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: [
              ...state.board.columns,
              {
                id: state.board.columns.length + 1,
                name: title,
                tasks: [],
              },
            ],
          },
        })),

      moveTask: (taskId, toColumnId) =>
        set((state) => {
          const columns = state.board.columns;

          const fromColumnIndex = columns.findIndex((column) =>
            column.tasks.some((task) => task.id === taskId),
          );

          const toColumnIndex = columns.findIndex(
            (column) => column.id === toColumnId,
          );

          if (fromColumnIndex === -1 || toColumnIndex === -1) {
            return state;
          }

          if (fromColumnIndex === toColumnIndex) {
            return state;
          }

          const task = columns[fromColumnIndex].tasks.find(
            (t) => t.id === taskId,
          );

          const newColumns = columns.map((col, index) => {
            if (index === fromColumnIndex) {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== taskId),
              };
            }
            if (index === toColumnIndex && task) {
              return { ...col, tasks: [...col.tasks, task] };
            }
            return col;
          });

          return {
            board: {
              ...state.board,
              columns: newColumns,
            },
          };
        }),

      toggleTaskCompletion: (taskId, columnId) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: updateTaskInColumn(
              state.board.columns,
              columnId,
              taskId,
              (task) => ({ ...task, isDone: !task.isDone }),
            ),
          },
        })),

      toggleSubtaskCompletion: (taskId, columnId, subtaskId) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: updateTaskInColumn(
              state.board.columns,
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
          },
        })),

      startTaskTimer: (taskId, columnId) =>
        set((state) => {
          const now = Date.now();

          return {
            board: {
              ...state.board,
              columns: state.board.columns.map((column) => {
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
            },
          };
        }),

      stopTaskTimer: (taskId, columnId) =>
        set((state) => {
          const now = Date.now();

          return {
            board: {
              ...state.board,
              columns: state.board.columns.map((column) => {
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
            },
          };
        }),
    }),
    {
      name: "kanban-board-storage",
      partialize: (state) => ({
        board: {
          columns: state.board.columns,
        },
      }),
    },
  ),
);
