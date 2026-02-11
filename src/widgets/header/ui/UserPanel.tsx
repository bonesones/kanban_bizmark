import { Activity } from "react";

import { MessageIcon, MoonIcon, NotificationIcon } from "@/shared/icons";

import { user } from "@/assets";

export const UserPanel = () => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-3 items-center">
        {userPanelActions.map((action, index) => {
          return (
            <button
              key={index}
              className="w-7.5 h-7.5 bg-white rounded-full flex items-center justify-center relative cursor-pointer"
            >
              <Activity
                mode={action.value === "notifications" ? "visible" : "hidden"}
              >
                <div className="w-2.75 h-2.75 bg-accentRed rounded-full absolute -top-px -left-0.5"></div>
              </Activity>

              <action.icon className="w-4 text-textMain" />
            </button>
          );
        })}
      </div>

      <button type="button" className="cursor-pointer rounded-full">
        <img src={user} alt="user" className="w-7.5 h-7.5" />
      </button>
    </div>
  );
};

const userPanelActions = [
  {
    icon: MoonIcon,
    value: "doNotDisturb",
  },
  {
    icon: MessageIcon,
    value: "messages",
  },
  {
    icon: NotificationIcon,
    value: "notifications",
  },
];
