// parses "dd-mm-yyyy" formatted date string
export const safeParseDate = (str: string) => {
  const [dd, mm, yyyy] = str.split("-");
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
};
