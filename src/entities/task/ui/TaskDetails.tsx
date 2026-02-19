import type { TaskModel } from "..";

type TaskDetailsProps = {
  task: TaskModel;
  columnId: number;
};

export const TaskDetails = ({ task }: TaskDetailsProps) => (
  <div>{task.name}</div>
);
