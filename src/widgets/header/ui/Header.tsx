import { useBoardStore } from "@/entities/board";

import { ProjectViewTabs } from "./ProjectViewTabs";
import { UserPanel } from "./UserPanel";

export const Header = () => {
  const name = useBoardStore((state) => state.board.name);

  const status = useBoardStore((state) => state.board.status);

  return (
    <header className="flex justify-between items-center w-full">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{name}</h1>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accentGreen rounded-full"></div>
            <span className="text-xs">{status}</span>
          </div>
        </div>

        <div className="mt-2">
          <ProjectViewTabs />
        </div>
      </div>

      <UserPanel />
    </header>
  );
};
