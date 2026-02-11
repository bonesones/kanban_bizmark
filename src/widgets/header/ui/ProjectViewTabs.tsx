import clsx from "clsx";

export const ProjectViewTabs = () => {
  return (
    <div className="flex gap-5">
      {projectTabs.map((tab) => {
        const className = clsx(
          "text-sm font-semibold pb-2",
          tab.value === "board"
            ? "text-accentBlue border-b-2"
            : "text-lightGray",
        );

        return (
          <button type="button" className={className} key={tab.value}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

const projectTabs = [
  {
    label: "Описание",
    value: "description",
  },
  {
    label: "Список",
    value: "list",
  },
  {
    label: "Канбан",
    value: "board",
  },
  {
    label: "Планирование",
    value: "plan",
  },
  {
    label: "Дашборд",
    value: "dashboard",
  },
  {
    label: "Команда",
    value: "team",
  },
];
