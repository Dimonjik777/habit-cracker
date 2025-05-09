import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const navigate = useNavigate();

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
    navigate(`?date=${newDate?.format("DD-MM-YYYY")}`);
  };

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
