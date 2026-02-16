import { PlayIcon } from "@/shared/icons";

import type { TaskActions } from "../api/taskActions";

type TaskTimerProps = {
  taskId: number;
  columnId: number;
  isRunning: boolean;
  startTaskTimer: TaskActions["startTaskTimer"];
  stopTaskTimer: TaskActions["stopTaskTimer"];
};

export const TaskTimerButton = ({
  taskId,
  columnId,
  isRunning,
  startTaskTimer,
  stopTaskTimer,
}: TaskTimerProps) => {
  const toggleTimer = isRunning ? stopTaskTimer : startTaskTimer;

  return (
    <button
      type="button"
      onClick={() => toggleTimer(taskId, columnId)}
      className="text-accentBlue cursor-pointer"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isRunning ? (
        <PlayIcon className="h-4.5 fill-accentBlue" />
      ) : (
        <PlayIcon className="h-4.5 fill-accentBlue" />
      )}
    </button>
  );
};
