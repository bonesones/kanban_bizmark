import { CheckpointFilledIcon, CheckpointIcon } from "@/shared/icons";

import type { TaskActions } from "../api/taskActions";

type TaskCompletionProps =
  | {
      type: "task";
      isDone: boolean;
      taskId: number;
      columnId: number;
      toggleTaskCompletion: TaskActions["toggleTaskCompletion"];
    }
  | {
      type: "subtask";
      isDone: boolean;
      taskId: number;
      columnId: number;
      subtaskId: number;
      toggleSubtaskCompletion: TaskActions["toggleSubtaskCompletion"];
    };

export const TaskCompletionButton = (props: TaskCompletionProps) => {
  const { type, taskId, columnId, isDone } = props;

  const handleClick = () => {
    if (type === "task") {
      props.toggleTaskCompletion(taskId, columnId);
    } else {
      props.toggleSubtaskCompletion(taskId, columnId, props.subtaskId);
    }
  };

  return (
    <button
      type="button"
      className="mt-0.75 cursor-pointer"
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isDone ? (
        <CheckpointFilledIcon className="h-3.25" />
      ) : (
        <CheckpointIcon className="h-3.25 fill-none" />
      )}
    </button>
  );
};
