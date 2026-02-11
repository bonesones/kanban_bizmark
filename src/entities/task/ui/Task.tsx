import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React from "react";

import {
  BranchIcon,
  CheckpointFilledIcon,
  CheckpointIcon,
  PlayIcon,
} from "@/shared/icons";

import { user } from "@/assets";

import "dayjs/locale/ru";

import type { Task as TaskModel } from "../model/task";

dayjs.locale("ru");

type TaskProps = {
  task: TaskModel;
  columnId: number;
  // eslint-disable-next-line no-unused-vars
  onToggleComplete: (taskId: number, columnId: number) => void;
};

export const Task = ({ task, columnId, onToggleComplete }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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

  const handleToggleComplete = () => {
    onToggleComplete(task.id, columnId);
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
        <button
          type="button"
          className="mt-0.75 cursor-pointer"
          onClick={handleToggleComplete}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {task.isDone ? (
            <CheckpointFilledIcon className="h-3.25" />
          ) : (
            <CheckpointIcon className="h-3.25 fill-none" />
          )}
        </button>

        <h3 className="text-sm text-textMain">{task.name}</h3>
      </div>

      <div className="flex justify-between items-center relative">
        <div className="flex gap-2 items-center">
          <img src={user} className="w-7.5 h-7.5" />

          <div className="text-xs flex flex-col font-semibold">
            {task.isDone ? (
              <span className="text-lightGray">{task.timeSpent} ч.</span>
            ) : (
              <>
                <span className="text-lightGray">
                  {task.timeSpent} ч. / {task.timePlanned} ч.
                </span>
                <span className={dateClassName}>До {dueDateFormatted}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 relative w-17.5">
          <motion.div
            className="flex gap-1 items-center text-xs text-lightGray absolute right-0"
            variants={branchVariants}
          >
            {task.subtasks.length > 0 && (
              <>
                <span>{task.subtasks.length}</span>
                <BranchIcon className="h-2.5" />
              </>
            )}
          </motion.div>

          <motion.button
            type="button"
            className="text-accentBlue absolute right-0 cursor-pointer"
            variants={playVariants}
          >
            <PlayIcon className="h-4.5 fill-none" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
