export type Task = {
  id: number;
  name: string;
  timePlanned: number;
  timeSpent: number;
  dueDate: Date;
  status: TaskStatus;
  isDone: boolean;
  subtasks: Subtask[];
};

type Subtask = {
  id: number;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TASK_STATUSES = ["toDo", "inProgress", "done"];
export type TaskStatus = (typeof TASK_STATUSES)[number];
