import type { TaskActions, TaskModel } from "../..";

import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskDetailsMeta } from "./TaskDetailsMeta";

type TaskDetailsProps = {
  task: TaskModel;
  columnId: number;
  taskActions: TaskActions;
  onClose: () => void;
};

export const TaskDetails = ({
  task,
  columnId,
  taskActions,
  onClose,
}: TaskDetailsProps) => {
  const handleToggleTimer = () => {
    if (task.timer.isRunning) {
      taskActions.stopTaskTimer(task.id, columnId);
    } else {
      taskActions.startTaskTimer(task.id, columnId);
    }
  };

  return (
    <div>
      <TaskDetailsHeader
        task={task}
        columnId={columnId}
        onCompleteClick={taskActions.toggleTaskCompletion}
        onToggleTimer={handleToggleTimer}
        onClose={onClose}
      />

      <div className="px-6 pt-3.5">
        <h4 className="text-2xl text-textMain font-semibold">{task.name}</h4>

        <TaskDetailsMeta />
      </div>
    </div>
  );
};
