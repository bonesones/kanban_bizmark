import { user } from "@/assets";

import type { TaskActions } from "../api/taskActions";
import type { Subtask as SubtaskModel } from "../model/task";

import { TaskCompletionButton } from "./TaskCompletionButton";
import clsx from "clsx";

type SubtaskProps = {
  subtask: SubtaskModel;
  taskId: number;
  columnId: number;
  toggleSubtaskCompletion: TaskActions["toggleSubtaskCompletion"];
};

export const Subtask = ({
  subtask,
  taskId,
  columnId,
  toggleSubtaskCompletion,
}: SubtaskProps) => (
  <div className={clsx("flex justify-between", subtask.isDone && "opacity-50")}>
    <div className="flex gap-2 items-center">
      <TaskCompletionButton
        type="subtask"
        taskId={taskId}
        columnId={columnId}
        subtaskId={subtask.id}
        isDone={subtask.isDone}
        toggleSubtaskCompletion={toggleSubtaskCompletion}
      />
      <span className="text-sm">Разработать прототип</span>
    </div>

    <img src={user} className="w-6 h-6 rounded-full" />
  </div>
);
