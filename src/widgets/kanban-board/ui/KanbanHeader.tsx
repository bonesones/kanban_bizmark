import { FilterIcon, SortIcon } from "@/shared/icons";

export const KanbanBoardHeader = () => {
  return (
    <div className="flex justify-between items-center border-b border-bgPrimary h-10 pr-5">
      <span className="text-sm text-gray">
        Последняя выполненная задача: 10 марта
      </span>

      <div className="flex gap-5">
        <button
          type="button"
          className="text-sm text-gray flex gap-2 items-center cursor-pointer"
        >
          <FilterIcon className="h-2.5" />
          Фильтрация
        </button>

        <button
          type="button"
          className="text-sm text-gray flex gap-2 items-center cursor-pointer"
        >
          <SortIcon className="h-2.5 mt-0.5" />
          Сортировка
        </button>
      </div>
    </div>
  );
};
