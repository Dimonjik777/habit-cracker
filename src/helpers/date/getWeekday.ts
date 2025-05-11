export const getWeekday = (date: Date) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
};
