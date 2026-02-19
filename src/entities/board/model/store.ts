import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ColumnModel } from "@/entities/column";
import type { TaskModel } from "@/entities/task";

import type { KanbanBoardModel } from "..";

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

const MOCK_COLUMNS: ColumnModel[] = [
  {
    id: 1,
    name: "Нужно сделать",
    tasks: [
      {
        id: 1,
        name: "Разработать новый чекаут для Юр. Лиц. eeee",
        timePlanned: 7200,
        timeSpent: 0,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        timer: { startedAt: null, isRunning: false },
        subtasks: [
          {
            id: 2,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
          {
            id: 3,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "В работе",
    tasks: [
      {
        id: 4,
        name: "Разработать новый чекаут для Юр. Лиц.",
        timePlanned: 7200,
        timeSpent: 0,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        timer: { startedAt: null, isRunning: false },
        subtasks: [
          {
            id: 5,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
          {
            id: 6,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "В работе",
    tasks: [
      {
        id: 7,
        name: "Разработать новый чекаут для Юр. Лиц.",
        timePlanned: 7200,
        timeSpent: 0,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        timer: { startedAt: null, isRunning: false },
        subtasks: [
          {
            id: 8,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
          {
            id: 9,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "В работе",
    tasks: [
      {
        id: 10,
        name: "Разработать новый чекаут для Юр. Лиц.",
        timePlanned: 7200,
        timeSpent: 0,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        timer: { startedAt: null, isRunning: false },
        subtasks: [
          {
            id: 11,
            name: "Разработать новый чекаут для Юр. Лиц. eeee",
            isDone: false,
          },
          {
            id: 12,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "В работе",
    tasks: [
      {
        id: 13,
        name: "Разработать новый чекаут для Юр. Лиц. eeeee",
        timePlanned: 7200,
        timeSpent: 0,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        timer: { startedAt: null, isRunning: false },
        subtasks: [
          {
            id: 14,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
          {
            id: 15,
            name: "Разработать новый чекаут для Юр. Лиц.",
            isDone: false,
          },
        ],
      },
    ],
  },
];

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
