import type { TaskActions, TaskModel } from "../..";
import { TaskDetailsComments } from "./TaskDetailsComments";

import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskDetailsMeta } from "./TaskDetailsMeta";
import { TaskDetailsSubtasks } from "./TaskDetailsSubtasks";

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
      <div className="flex flex-col">
        <h4 className="text-2xl text-textMain font-semibold">{task.name}</h4>

        <TaskDetailsMeta />

   
        <h5 className="text-gray text-sm">Подзадачи</h5>

        <TaskDetailsSubtasks task={task}  columnId={columnId} onSubtaskComplete={taskActions.toggleSubtaskCompletion}/>
    
        <TaskDetailsComments />
      </div>
    </div>
  );
};
