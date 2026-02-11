import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ColumnModel } from "@/entities/column";

import type { KanbanBoardModel } from "..";

type BoardState = {
  board: KanbanBoardModel;
  // eslint-disable-next-line no-unused-vars
  addColumn: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  moveTask: (taskId: number, toColumnId: number) => void;
  // eslint-disable-next-line no-unused-vars
  completeTask: (taskId: number, columnId: number) => void;
};

const MOCK_COLUMNS: ColumnModel[] = [
  {
    id: 1,
    name: "Нужно сделать",
    tasks: [
      {
        id: 1,
        name: "Разработать новый чекаут для Юр. Лиц. eeee",
        timePlanned: 10,
        timeSpent: 5,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        subtasks: [
          {
            id: 2,
            name: "Разработать новый чекаут для Юр. Лиц.",
          },
          {
            id: 3,
            name: "Разработать новый чекаут для Юр. Лиц.",
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
        timePlanned: 10,
        timeSpent: 5,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        subtasks: [
          {
            id: 5,
            name: "Разработать новый чекаут для Юр. Лиц.",
          },
          {
            id: 6,
            name: "Разработать новый чекаут для Юр. Лиц.",
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
        timePlanned: 10,
        timeSpent: 5,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        subtasks: [
          {
            id: 8,
            name: "Разработать новый чекаут для Юр. Лиц.",
          },
          {
            id: 9,
            name: "Разработать новый чекаут для Юр. Лиц.",
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
        timePlanned: 10,
        timeSpent: 5,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        subtasks: [
          {
            id: 11,
            name: "Разработать новый чекаут для Юр. Лиц. eeee",
          },
          {
            id: 12,
            name: "Разработать новый чекаут для Юр. Лиц.",
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
        timePlanned: 10,
        timeSpent: 5,
        dueDate: new Date(),
        status: "toDo",
        isDone: false,
        subtasks: [
          {
            id: 14,
            name: "Разработать новый чекаут для Юр. Лиц.",
          },
          {
            id: 15,
            name: "Разработать новый чекаут для Юр. Лиц.",
          },
        ],
      },
    ],
  },
];

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => {
      return {
        board: {
          id: 1,
          name: "Проект Лиц",
          columns: MOCK_COLUMNS,
          status: "В работе",
        },

        addColumn: (title) => {
          return set((state) => {
            return {
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
            };
          });
        },

        moveTask: (taskId, toColumnId) => {
          return set((state) => {
            const columns = state.board.columns;

            const fromColumnIndex = columns.findIndex((column) => {
              return column.tasks.some((task) => {
                return task.id === taskId;
              });
            });

            const toColumnIndex = columns.findIndex((column) => {
              return column.id === toColumnId;
            });

            if (fromColumnIndex === -1 || toColumnIndex === -1) {
              return state;
            }

            const taskIndex = columns[fromColumnIndex].tasks.findIndex(
              (task) => {
                return task.id === taskId;
              },
            );

            const [task] = columns[fromColumnIndex].tasks.splice(taskIndex, 1);
            columns[toColumnIndex].tasks.push(task);

            return {
              board: {
                ...state.board,
                columns,
              },
            };
          });
        },

        completeTask: (taskId, columnId) => {
          return set((state) => {
            const columns = state.board.columns;

            const activeColumn = columns.find((column) => {
              return column.id === columnId;
            });

            if (!activeColumn) {
              return state;
            }

            const taskIndex = activeColumn.tasks.findIndex((task) => {
              return task.id === taskId;
            });

            if (taskIndex === -1) {
              return state;
            }

            activeColumn.tasks[taskIndex].isDone = true;
            activeColumn.tasks[taskIndex].status = "done";

            return {
              board: {
                ...state.board,
                columns,
              },
            };
          });
        },
      };
    },
    {
      name: "kanban-board-storage",
      partialize: (state) => {
        return {
          board: {
            columns: state.board.columns,
          },
        };
      },
    },
  ),
);
