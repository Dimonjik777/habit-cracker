import styles from "/src/styles/modules/dashboard/all/dashboard-all.module.scss";
import ArrowLeft from "/src/assets/arrow-left.svg?react";
import ArrowRight from "/src/assets/arrow-right.svg?react";
import { useState, useEffect } from "react";
import AddButton from "../../components/dashboard/all/AddButton";
import { useModal } from "../../contexts/ModalContext";
import AddHabit from "../../components/habit-form/forms/AddHabit";
import { useLocation, useNavigate } from "react-router-dom";
import Habits from "../../components/dashboard/all/Habits";
import { formatDate } from "../../helpers/format-date";

export default function DashboardAll() {
  const { openModal } = useModal();
  const [weekday, setWeekday] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const dateString = getDateParam();
    console.log(dateString);
    const [day, month, year] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    setWeekday(date.toLocaleDateString("en-US", { weekday: "long" }));
    setDateString(
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [location.search]);

  // in case date search param is not set, set it manually
  useEffect(() => {
    if (!new URLSearchParams(location.search).get("date")) {
      const dateParam = getDateParam();
      const [day, month, year] = dateParam.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      navigate(`?date=${formatDate(date)}`);
    }
  }, [location.search]);

  const getDateParam = (): string => {
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get("date");

    if (!dateParam) {
      return formatDate(new Date());
    }

    // Try to parse the date parameter
    const [day, month, year] = dateParam.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // Validate date and return formatted string
    return isNaN(date.getTime()) ? formatDate(new Date()) : formatDate(date);
  };
  const navigateDate = (direction: "prev" | "next") => {
    const currentDate = getDateParam();
    const [day, month, year] = currentDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // Add or subtract a day
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));

    // Navigate to new date
    navigate(`?date=${formatDate(date)}`);
  };
  const isToday = () => {
    return getDateParam() == formatDate(new Date());
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dateTitleContainer}>
          <h2>{weekday}</h2>
          {/* can you help me with this one: */}
          <p>{dateString}</p>
        </div>
        <div className={styles.dateToggleContainer}>
          <div
            className={styles.iconContainer}
            onClick={() => navigateDate("prev")}
          >
            <ArrowLeft />
          </div>
          <div
            className={`${styles.iconContainer}  ${
              isToday() ? styles.inactive : ""
            }`}
            onClick={() => navigateDate("next")}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Habits date={getDateParam()} />
      </div>
      <AddButton
        onClick={() => {
          openModal(<AddHabit />);
        }}
      />
    </div>
  );
}
