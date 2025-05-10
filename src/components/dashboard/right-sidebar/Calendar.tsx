import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { safeParseDate } from "../../../helpers/date-parser";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const navigate = useNavigate();
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
    navigate(`?date=${newDate?.format("DD-MM-YYYY")}`);
  };
  const location = useLocation();
  useEffect(() => {
    const dateParam = new URLSearchParams(location.search).get("date");
    if (dateParam) {
      const date = safeParseDate(dateParam);
      setSelectedDate(dayjs(date));
    }
  }, [location.search]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        disableFuture
      />
    </LocalizationProvider>
  );
}
