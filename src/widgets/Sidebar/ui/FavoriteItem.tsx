import clsx from "clsx";

export const FavoriteItem = ({ title, color }: FavoriteItemProps) => {
  const className = clsx(
    "w-2.5 h-2.5 rounded-full",
    color === "green" ? "bg-accentGreen" : "bg-accentLightBlue",
  );

  return (
    <div className="flex gap-3 items-center">
      <div className={className}></div>
      <span className="text-sm font-semibold text-textMain">{title}</span>
    </div>
  );
};

export type FavoriteItemProps = {
  title: string;
  color: "green" | "blue";
};
