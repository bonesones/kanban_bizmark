import { useEffect } from "react";

import { PlayActiveIcon, PlayIcon } from "@/shared/icons";

import type { TaskActions } from "../api/taskActions";

type TaskTimerProps = {
  taskId: number;
  isTaskDone: boolean;
  columnId: number;
  isRunning: boolean;
  startTaskTimer: TaskActions["startTaskTimer"];
  stopTaskTimer: TaskActions["stopTaskTimer"];
};

export const TaskTimerButton = ({
  taskId,
  isTaskDone,
  columnId,
  isRunning,
  startTaskTimer,
  stopTaskTimer,
}: TaskTimerProps) => {
  useEffect(() => {
    if (isTaskDone && isRunning) {
      stopTaskTimer(taskId, columnId);
    }
  }, [isTaskDone]);

  const handleToggleTimer = () => {
    if (isRunning) {
      stopTaskTimer(taskId, columnId);
    } else {
      startTaskTimer(taskId, columnId);
    }
  };

  return (
    <button
      type="button"
      onClick={isTaskDone ? undefined : handleToggleTimer}
      className="cursor-pointer w-full h-full"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isRunning && !isTaskDone ? (
        <PlayActiveIcon className="h-full" />
      ) : (
        <PlayIcon className="h-full text-accentBlue" />
      )}
    </button>
  );
};
