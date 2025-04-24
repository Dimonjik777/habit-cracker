import Calendar from "./Calendar";
import HabitsPieChart from "./HabitsPieChart";
import { useSidebar } from "../contexts/SidebarContext";
import styles from "/src/styles/modules/right-sidebar.module.scss";

export default function RightSidebar() {
  const { rightSidebarOpen, closeRightSidebar } = useSidebar();
  return (
    <div className={rightSidebarOpen ? styles.open : ""}>
      <div className={styles.overflow} onClick={closeRightSidebar}></div>
      <div className={styles.container}>
        <HabitsPieChart />
        <Calendar />
      </div>
    </div>
  );
}
