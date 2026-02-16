import { useBoardStore } from "@/entities/board";
import type { TaskActions } from "@/entities/task";

export const useTaskActions = (): TaskActions => {
  const moveTask = useBoardStore((state) => state.moveTask);

  const toggleTaskCompletion = useBoardStore(
    (state) => state.toggleTaskCompletion,
  );

  const toggleSubtaskCompletion = useBoardStore(
    (state) => state.toggleSubtaskCompletion,
  );

  const startTaskTimer = useBoardStore((state) => state.startTaskTimer);
  const stopTaskTimer = useBoardStore((state) => state.stopTaskTimer);

  return {
    moveTask,
    toggleTaskCompletion,
    toggleSubtaskCompletion,
    startTaskTimer,
    stopTaskTimer,
  };
};
