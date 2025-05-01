import styles from "/src/styles/modules/dashboard-all.module.scss";
import ArrowLeft from "/src/assets/arrow-left.svg?react";
import ArrowRight from "/src/assets/arrow-right.svg?react";
import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";
export default function DashboardAll() {
  const [weekday, setWeekday] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  useEffect(() => {
    const date = new Date();
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    setWeekday(weekday);
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDateString(dateString);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dateTitleContainer}>
          <h2>{weekday}</h2>
          {/* can you help me with this one: */}
          <p>{dateString}</p>
        </div>
        <div className={styles.dateToggleContainer}>
          <div className={styles.iconContainer}>
            <ArrowLeft />
          </div>
          <div className={styles.iconContainer}>
            <ArrowRight />
          </div>
        </div>
      </div>
      <AddButton />
    </div>
  );
}
