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
        comments: [
          {
            id: 1,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 5 * 60 * 1000),
          },
          {
            id: 2,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 12 * 60 * 1000),
          },
        ],
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
        comments: [
          {
            id: 3,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 10 * 60 * 1000),
          },
        ],
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
        comments: [],
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
        comments: [
          {
            id: 4,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 30 * 60 * 1000),
          },
        ],
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
        comments: [
          {
            id: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 10 * 60 * 1000),
          },
          {
            id: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget, venenatis tempus nisl.",
            publishedAt: new Date(Date.now() - 10 * 60 * 1000),
          },
        ],
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
