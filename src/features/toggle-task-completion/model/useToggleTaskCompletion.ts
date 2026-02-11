import { useCallback } from "react";

import { useBoardStore } from "@/entities/board";

export const useToggleTaskCompletion = () => {
  const toggle = useBoardStore((state) => state.toggleTaskCompletion);

  return useCallback(
    (taskId: number, columnId: number) => {
      toggle(taskId, columnId);
    },
    [toggle],
  );
};
