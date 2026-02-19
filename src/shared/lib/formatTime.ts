import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatTime = (seconds: number) => {
  const time = dayjs.duration(seconds, "seconds");
  const timeFormatted = `${String(Math.floor(time.asHours())).padStart(2, "0")} ч. ${String(time.minutes()).padStart(2, "0")} м.`;

  return timeFormatted;
};
