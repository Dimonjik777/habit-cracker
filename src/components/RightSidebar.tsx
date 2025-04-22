import Calendar from "./Calendar";
import HabitsPieChart from "./HabitsPieChart";

import styles from "/src/styles/modules/right-sidebar.module.scss";

export default function RightSidebar() {

  return (
    <div className={styles.container}>
      <HabitsPieChart />
      <Calendar />
    </div>
  )
}