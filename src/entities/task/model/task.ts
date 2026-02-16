export type Task = {
  id: number;
  name: string;
  timePlanned: number;
  timeSpent: number;
  dueDate: Date;
  status: TaskStatus;
  isDone: boolean;
  timer: TaskTimer;
  subtasks: Subtask[];
};

export type Subtask = {
  id: number;
  name: string;
  isDone: boolean;
};

export type TaskTimer = {
  startedAt: number | null;
  isRunning: boolean;
};

export const TASK_STATUSES = ["toDo", "inProgress", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
