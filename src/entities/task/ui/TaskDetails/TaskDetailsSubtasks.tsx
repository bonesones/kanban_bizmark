import { CalendarIcon, PlusIcon } from "@/shared/icons"
import { UserIcon } from "@/shared/icons/UserIcon"
import type { TaskActions } from "../../api/taskActions"
import type { TaskModel } from "../.."
import { TaskCompletionButton } from "../TaskCompletionButton"
import clsx from "clsx"

type TaskDetailsSubtasksProps = {
    task: TaskModel;
    columnId: number;
    onSubtaskComplete: TaskActions['toggleSubtaskCompletion'];
}

export const TaskDetailsSubtasks = ({
    task,
    columnId,
    onSubtaskComplete
}: TaskDetailsSubtasksProps) => {
    return (
        <div className="flex flex-col gap-2 mt-3">
            {
                task.subtasks.map((subtask) => (
                    <TaskDetailSubtasksItem key={subtask.id} taskId={task.id} subtaskId={subtask.id} columnId={columnId} title={subtask.name} isDone={subtask.isDone} onComplete={onSubtaskComplete} />
                ))  
            }

            <button type="button" className="flex gap-4 items-center cursor-pointer text-gray text-sm">
                <PlusIcon className="h-2.25" />
                Добавить подзадачу
            </button>
        </div>
    )

}

const TaskDetailSubtasksItem = ({
    taskId,
    title,
    subtaskId,
    columnId,
    isDone,
    onComplete
}: {
    taskId: number;
    title: string;
    isDone: boolean;
    subtaskId: number;
    columnId: number;
    onComplete: TaskActions['toggleSubtaskCompletion'];
}) => {
    return (
        <div className={clsx("flex justify-between items-center", isDone && "opacity-50")}>
            <div className="flex gap-3 items-center">
                <TaskCompletionButton type="subtask" isDone={isDone} taskId={taskId} columnId={columnId} subtaskId={subtaskId} toggleSubtaskCompletion={onComplete} />

                <span className="text-sm text-textMain">{title}</span>
            </div>

            <div className="flex gap-2">
                <button type="button" className="border border-dashed border-metaGray w-fit rounded-full p-1.75 cursor-pointer">
                    <CalendarIcon className="h-3 text-metaGray" />
                </button>

                <button type="button" className="border border-dashed border-metaGray w-fit rounded-full p-1.75 cursor-pointer">
                    <UserIcon className="h-3.75 text-metaGray" />
                </button>
            </div>
        </div>
    )
}