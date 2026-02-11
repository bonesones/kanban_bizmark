import { Header } from "@/widgets/header";
import { KanbanBoard } from "@/widgets/kanban-board";
import { Sidebar } from "@/widgets/sidebar";

export const ProjectPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="pl-5 flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};
