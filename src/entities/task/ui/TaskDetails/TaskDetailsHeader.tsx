import clsx from "clsx";
import React from "react";

import {
  ArrowRightIcon,
  CheckIcon,
  PaperClipIcon,
  PlayIcon,
} from "@/shared/icons";
import { formatTime } from "@/shared/lib";

import type { TaskModel } from "../..";
import type { TaskActions } from "../../api/taskActions";
import { TaskTimer } from "../TaskTimer";

type TaskDetailsHeaderProps = {
  onCompleteClick: TaskActions["toggleTaskCompletion"];
  onToggleTimer: () => void;
  task: TaskModel;
  columnId: number;
  onClose: () => void;
};

export const TaskDetailsHeader = ({
  onCompleteClick,
  task,
  columnId,
  onToggleTimer,
  onClose,
}: TaskDetailsHeaderProps) => {
  const timeSpentFormatted = formatTime(task.timeSpent);
  const timePlannedFormatted = formatTime(task.timePlanned);

  const handleTaskComplete = () => {
    onCompleteClick(task.id, columnId);
  };

  return (
    <div className="flex justify-between py-3.5 px-6 border-b border-bgPrimary">
      <div className="flex gap-4 items-center">
        {
          task.timer.isRunning ? (
            <ButtonWithIcon
              icon={<PlayIcon className="h-[13.5px]" />}
              title="Завершить работу над задачей"
              onClick={onToggleTimer}
              className="bg-accentBlue text-white"
            />
          ) : (
            <ButtonWithIcon
              icon={<PlayIcon className="h-[13.5px]" />}
              title="Работать над задачей"
              onClick={onToggleTimer}
              className="bg-bgPrimary text-black"
            />
          )
        }

        <div className="text-sm">
          {task.isDone ? (
            <span>{timeSpentFormatted}</span>
          ) : (
            <span>
              <TaskTimer timer={task.timer} timeSpent={task.timeSpent} /> /{" "}
              {timePlannedFormatted}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {
          task.isDone ? (
            <ButtonWithIcon
              icon={<CheckIcon className="h-[7.5px]" />}
              title="Задача завершена"
              onClick={handleTaskComplete}
              className="bg-bgMain"
            />
          ) : (
            <ButtonWithIcon
              icon={<CheckIcon className="h-[7.5px]" />}
              title="Завершить задачу"
              onClick={handleTaskComplete}
              className="bg-green text-white "
            />
          )
        }

        <IconButton
          icon={<PaperClipIcon className="h-3.5" />}
          onClick={() => {}}
        />

        <IconButton
          icon={<ArrowRightIcon className="h-2.5" />}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const ButtonWithIcon = ({
  icon,
  title,
  onClick,
  className: _className,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  className?: string;
}) => {
  const className = clsx(
    "rounded-[10px] flex items-center gap-3 text-sm px-5.5 py-1.75 cursor-pointer",
    _className,
  );

  return (
    <button type="button" className={className} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
};

const IconButton = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-bgPrimary rounded-full w-7.5 flex items-center justify-center cursor-pointer text-textMain"
  >
    {icon}
  </button>
);
