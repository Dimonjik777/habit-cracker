import Calendar from "./Calendar";
import HabitsPieChart from "./HabitsPieChart";
import { useSidebar } from "../contexts/SidebarContext";
import styles from "/src/styles/modules/right-sidebar.module.scss";
import CloseIcon from "/src/assets/close.svg?react";

export default function RightSidebar() {
  const { rightSidebarOpen, closeRightSidebar } = useSidebar();
  return (
    <div className={rightSidebarOpen ? styles.open : ""}>
      <div className={styles.overflow} onClick={closeRightSidebar}></div>
      <div className={styles.container}>
        <CloseIcon className={styles.close} onClick={closeRightSidebar} />
        <HabitsPieChart />
        <div className={styles.calendarContainer}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
