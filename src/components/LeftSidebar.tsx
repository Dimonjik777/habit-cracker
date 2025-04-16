import Logo from "/src/assets/logo.svg?react";
import styles from "/src/styles/modules/left-sidebar.module.scss";

export default function LeftSidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
        <h1>Habit Cracker</h1>
      </div>
      <div className={styles.linksContainer}>
        <a href="/dashboard/all" className="">
          All habits
        </a>
        <a href="/dashboard/statistics" className="">
          Statistics
        </a>
      </div>
      <div className={styles.signoutContainer}>
        <input type="button" value="Sign Out" />
      </div>
    </div>
  );
}
