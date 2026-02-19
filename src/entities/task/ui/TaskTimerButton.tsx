import { PlayActiveIcon, PlayIcon } from "@/shared/icons";

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
      onClick={handleToggleTimer}
      className="cursor-pointer w-full h-full"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isRunning ? (
        <PlayActiveIcon className="h-full" />
      ) : (
        <PlayIcon className="h-full text-accentBlue" />
      )}
    </button>
  );
};
