import { useEffect, useState } from "react";

import type { Task } from "../model";

type TaskTimerProps = Pick<Task, "timer" | "timeSpent">;

export const TaskTimer = ({ timer, timeSpent }: TaskTimerProps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!timer.isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const getLiveSeconds = () => {
    if (!timer.isRunning || !timer.startedAt) {
      return timeSpent;
    }

    const diff = Math.max(0, Math.floor((now - timer.startedAt) / 1000));
    return (timeSpent ?? 0) + diff;
  };

  const totalSeconds = getLiveSeconds();

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );

  return (
    <span>
      {hours} ч. {minutes} м.
    </span>
  );
};
