import { formatDate } from "./formatDate";

export const getDateParam = (): string => {
  const queryParams = new URLSearchParams(location.search);
  const dateParam = queryParams.get("date");

  if (!dateParam) {
    return "";
  }

  // Try to parse the date parameter
  const [day, month, year] = dateParam.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // Validate date and return formatted string
  return isNaN(date.getTime()) ? formatDate(new Date()) : formatDate(date);
};
