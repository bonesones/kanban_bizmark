import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { BranchIcon } from "@/shared/icons";

import { user } from "@/assets";

import "dayjs/locale/ru";

import type { TaskActions } from "../api/taskActions";
import type { Task as TaskModel } from "../model/task";

import { Subtask } from "./Subtask";
import { TaskCompletionButton } from "./TaskCompletionButton";
import { TaskTimer } from "./TaskTimer";
import { TaskTimerButton } from "./TaskTimerButton";

dayjs.locale("ru");
dayjs.extend(duration);

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

  const timePlanned = dayjs.duration(task.timePlanned, "seconds");
  const timePlannedFormatted = `${String(Math.floor(timePlanned.asHours())).padStart(2, "0")} ч. ${String(timePlanned.minutes()).padStart(2, "0")} м.`;

  const timeSpent = dayjs.duration(task.timeSpent, "seconds");
  const timeSpentFormatted = `${String(Math.floor(timeSpent.asHours())).padStart(2, "0")} ч. ${String(timeSpent.minutes()).padStart(2, "0")} м.`;

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
              <span className="text-lightGray">{timeSpentFormatted}</span>
            ) : (
              <>
                <span className="text-lightGray">
                  <TaskTimer timer={task.timer} timeSpent={task.timeSpent} /> /{" "}
                  {timePlannedFormatted}
                </span>
                <span className={dateClassName}>До {dueDateFormatted}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 relative w-17.5">
          {!task.timer.isRunning ? (
            <>
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
                  className="absolute right-0 flex items-center h-4.5"
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
            </>
          ) : (
            <>
              <button
                type="button"
                className="flex gap-1 items-center text-xs text-lightGray  cursor-pointer"
                onClick={handleToggleDetails}
                onPointerDown={(e) => e.preventDefault()}
              >
                <span>{task.subtasks.length}</span>
                <BranchIcon className="h-2.5" />
              </button>
              <motion.div
                animate={{
                  scale: !task.timer.isRunning ? 1 : 1.33,
                }}
                className="h-4.5"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <TaskTimerButton
                  taskId={task.id}
                  columnId={columnId}
                  isRunning={task.timer.isRunning}
                  startTaskTimer={actions.startTaskTimer}
                  stopTaskTimer={actions.stopTaskTimer}
                />
              </motion.div>
            </>
          )}
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
            <div className=" flex flex-col gap-4">
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
