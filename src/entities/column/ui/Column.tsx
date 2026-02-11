import { useDroppable } from "@dnd-kit/core";

import { Task } from "@/entities/task";

import { DotsIcon, PlusIcon } from "@/shared/icons";

import type { Column as ColumnModel } from "../model/types";

type ColumnProps = {
  column: ColumnModel;
  // eslint-disable-next-line no-unused-vars
  toggleTaskCompletion: (taskId: number, columnId: number) => void;
};

export const Column = ({ column, toggleTaskCompletion }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      columnId: column.id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-80 bg-bgPrimary pt-3 px-4 rounded-tl-[10px] rounded-tr-[10px] text-textMain shrink-0 h-full"
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-semibold">{column.name}</h2>

        <div className="flex items-center gap-3">
          <button type="button" className="cursor-pointer">
            <PlusIcon className="h-[7.5px]" />
          </button>

          <button type="button" className="cursor-pointer">
            <DotsIcon className="h-0.5" />
          </button>
        </div>
      </div>

      {column.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          columnId={column.id}
          onToggleComplete={toggleTaskCompletion}
        />
      ))}
    </div>
  );
};
