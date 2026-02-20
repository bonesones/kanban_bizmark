import { user } from "@/assets";

export const TaskDetailsComments = () => (
  <div>
    <TaskDetailsCommentsItem />
  </div>
);

const TaskDetailsCommentsItem = () => (
  <div className="flex gap-4 border-t border-t-bgPrimary">
    <img src={user} className="h-8" />

    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold flex gap-2">
        <span className="text-textMain">Nick Khaetsky</span>
        <span className="text-lightGray">25 минут назад</span>
      </div>

      <div className="text-sm text-textMain">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        imperdiet hendrerit ipsum vel gravida. Nullam auctor nisl leo, eu luctus
        ex eleifend nec. Praesent mauris odio, dapibus sit amet ipsum eget,
        venenatis tempus nisl.
      </div>
    </div>
  </div>
);
