import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { SendIcon } from "@/shared/icons";

import { user } from "@/assets";

import type { Comment } from "../../model/index";

dayjs.extend(relativeTime);

type TaskDetailsCommentsProps = {
  comments: Comment[];
};

type taskDetailsCommentsItemProps = {
  comment: Comment;
};

export const TaskDetailsComments = ({ comments }: TaskDetailsCommentsProps) => (
  <div className="flex flex-col gap-2 mt-6 pb-20">
    {comments.map((comment) => (
      <TaskDetailsCommentsItem comment={comment} key={comment.id} />
    ))}

    <div className="flex items-center gap-4 mt-4">
      <img src={user} className="h-8" />

      <div className="border border-[#E5E5E5] flex w-full gap-3 justify-between py-2 px-4 rounded-[10px]">
        <input
          type="text"
          placeholder="Задайте вопрос или напишите комментарий..."
          className="text-sm flex-1 focus:outline-none"
        />

        <button type="button" className="cursor-pointer">
          <SendIcon className="h-6 w-6 text-[#E5E5E5]" />
        </button>
      </div>
    </div>
  </div>
);

const TaskDetailsCommentsItem = ({ comment }: taskDetailsCommentsItemProps) => (
  <div className="flex gap-4 border-t py-3 border-t-bgPrimary">
    <img src={user} className="h-8" />

    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold flex gap-2">
        <span className="text-textMain">Nick Khaetsky</span>
        <span className="text-lightGray">
          {dayjs(comment.publishedAt).fromNow()}
        </span>
      </div>

      <div className="text-sm text-textMain">{comment.text}</div>
    </div>
  </div>
);
