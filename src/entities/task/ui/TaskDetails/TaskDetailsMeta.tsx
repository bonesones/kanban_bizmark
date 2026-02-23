import clsx from "clsx";
import React from "react";

import { CalendarIcon } from "@/shared/icons";

import { user } from "@/assets";

export const TaskDetailsMeta = () => (
  <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-6 py-5">
    <TaskDetailsMetaItem title="Исполнитель">
      <div className="flex gap-3 items-center pl-3">
        <img src={user} className="w-7" />
        <span className="text-sm">Никита Хаецкий</span>
      </div>
    </TaskDetailsMetaItem>

    <TaskDetailsMetaItem title="Даты">
      <div className="text-metaGray flex gap-3 items-center pl-3">
        <div className="border border-dashed border-metaGray w-fit rounded-full p-1.75">
          <CalendarIcon className="h-3" />
        </div>

        <span className="font-semibold text-sm">Нет даты</span>
      </div>
    </TaskDetailsMetaItem>

    <TaskDetailsMetaItem title="Проект">
      <button
        type="button"
        className="text-xs font-semibold cursor-pointer text-metaGray pl-3"
      >
        Добавить проект
      </button>
    </TaskDetailsMetaItem>

    <TaskDetailsMetaItem title="Описание" align="start">
      <textarea
        className="rounded-[10px] border border-bgPrimary w-full px-3 py-3 resize-none focus:outline-none text-xs font-semibold placeholder-metaGray"
        rows={3}
        cols={5}
        placeholder="Добавьте описание к этой задаче..."
      ></textarea>
    </TaskDetailsMetaItem>
  </div>
);

const TaskDetailsMetaItem = ({
  title,
  children,
  align = "center",
}: {
  title: string;
  children: React.ReactNode;
  align?: "center" | "start";
}) => (
  <>
    <div
      className={clsx(
        "text-metaGray text-xs font-semibold flex",
        align === "start" ? "items-start pt-2" : "items-center",
      )}
    >
      {title}
    </div>
    <div>{children}</div>
  </>
);
