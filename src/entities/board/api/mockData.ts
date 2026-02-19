import type { ColumnModel } from "@/entities/column";

export const MOCK_COLUMNS = [
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
] satisfies ColumnModel[];
