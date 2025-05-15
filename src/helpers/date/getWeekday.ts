export const getWeekday = (date: Date) => {
  const days = ["sun", "mon", "tue", "wen", "thu", "fri", "sat"];
  return days[date.getDay()];
};
