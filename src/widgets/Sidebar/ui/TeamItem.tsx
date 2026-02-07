import { ArrowDownIcon } from "@/shared/icons";

export const TeamItem = ({ title }: TeamItemProps) => {
  return (
    <button className="flex gap-2 items-center text-textMain">
      <ArrowDownIcon className="-rotate-90 h-1" />

      <span className="text-sm font-semibold">{title}</span>
    </button>
  );
};

export type TeamItemProps = {
  title: string;
};
