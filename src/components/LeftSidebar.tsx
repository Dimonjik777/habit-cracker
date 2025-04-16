import Logo from "/src/assets/logo.svg?react";
import ListIcon from "/src/assets/list.svg?react";
import ChartIcon from "/src/assets/chart.svg?react";
import styles from "/src/styles/modules/left-sidebar.module.scss";

export default function LeftSidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
        <h1>Habit Cracker</h1>
      </div>
      <div className={styles.linksContainer}>
        <div className={`${styles.link} ${styles.active}`}>
          <ListIcon />
          <h4>All habits</h4>
        </div>
        <div className={styles.link}>
          <ChartIcon />
          <h4>Statistics</h4>
        </div>
      </div>
      <div className={styles.signoutContainer}>
        <input type="button" value="Sign Out" />
      </div>
    </div>
  );
}
