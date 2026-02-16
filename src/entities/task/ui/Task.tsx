import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { BranchIcon } from "@/shared/icons";

import { user } from "@/assets";

import "dayjs/locale/ru";

import type { TaskActions } from "../api/taskActions";
import type { Task as TaskModel } from "../model/task";

import { Subtask } from "./Subtask";
import { TaskCompletionButton } from "./TaskCompletionButton";
import { TaskTimerButton } from "./TaskTimerButton";

dayjs.locale("ru");

type TaskProps = {
  task: TaskModel;
  columnId: number;
  actions: TaskActions;
};

export const Task = ({ task, columnId, actions }: TaskProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        type: "task",
        taskId: task.id,
        columnId: columnId,
      },
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    padding: 10,
    marginBottom: 8,
    background: "white",
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    cursor: "grab",
    position: "relative",
    zIndex: isDragging ? 999 : "auto",
  };

  const branchVariants = {
    initial: { x: 0 },
    hover: { x: -30 },
  };

  const playVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };
  const today = dayjs();

  const dueDate = dayjs(task.dueDate);
  const dueDateFormatted = dueDate.format("D MMMM");

  const dateClassName = clsx(
    today.isBefore(dueDate, "day") || today.isSame(dueDate, "day")
      ? "text-lightGray"
      : "text-accentRed",
  );

  const handleToggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-[10px] shadow-md pt-2 pb-4 px-4 flex flex-col gap-3 group"
      initial="initial"
      whileHover="hover"
      {...listeners}
      {...attributes}
    >
      <div
        className={`flex items-start gap-3 ${task.isDone ? "opacity-50" : ""}`}
      >
        <TaskCompletionButton
          isDone={task.isDone}
          taskId={task.id}
          columnId={columnId}
          type="task"
          toggleTaskCompletion={actions.toggleTaskCompletion}
        />

        <h3 className="text-sm text-textMain">{task.name}</h3>
      </div>

      <div className="flex justify-between items-center relative">
        <div className="flex gap-2 items-center">
          <img src={user} className="w-7.5 h-7.5" />

          <div className="text-xs flex flex-col font-semibold">
            {task.isDone ? (
              <span className="text-lightGray">
                {dayjs(task.timeSpent).format("HH:mm")}
              </span>
            ) : (
              <>
                <span className="text-lightGray">
                  {dayjs(task.timeSpent).format("HH:mm")} / {task.timePlanned}{" "}
                  ч.
                </span>
                <span className={dateClassName}>До {dueDateFormatted}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 relative w-17.5">
          <AnimatePresence>
            {task.subtasks.length > 0 && (
              <motion.button
                className="flex gap-1 items-center text-xs text-lightGray absolute right-0 cursor-pointer"
                variants={branchVariants}
                type="button"
                onClick={handleToggleDetails}
                onPointerDown={(e) => e.preventDefault()}
              >
                <span>{task.subtasks.length}</span>
                <BranchIcon className="h-2.5" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              className="text-accentBlue absolute right-0"
              variants={playVariants}
            >
              <TaskTimerButton
                taskId={task.id}
                columnId={columnId}
                isRunning={task.timer.isRunning}
                startTaskTimer={actions.startTaskTimer}
                stopTaskTimer={actions.stopTaskTimer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isDetailsOpen && (
          <motion.div
            className="border-t border-t-secondaryWhite pt-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-t-secondaryWhite pt-2 flex flex-col gap-4">
              {task.subtasks.map((subtask) => (
                <Subtask
                  key={subtask.id}
                  subtask={subtask}
                  taskId={task.id}
                  columnId={columnId}
                  toggleSubtaskCompletion={actions.toggleSubtaskCompletion}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
