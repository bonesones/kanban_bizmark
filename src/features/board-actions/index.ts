import { useBoardStore } from "@/entities/board";
import type { BoardActions } from "@/entities/board/api/boardActions";

export const useBoardActions = (): BoardActions => {
  const addColumn = useBoardStore((state) => state.addColumn);

  return {
    addColumn,
  };
};
