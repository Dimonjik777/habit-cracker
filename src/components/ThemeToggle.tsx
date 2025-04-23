import Moon from "/src/assets/moon.svg?react";
import Sun from "/src/assets/sun.svg?react";
import styles from "/src/styles/modules/theme-toggle.module.scss";

export default function ThemeToggle() {
  return (
    <div className={styles.container}>
      <input type="checkbox" id="theme-toggle" />
      <label htmlFor="theme-toggle">
        <div className={styles.toggle}>
          <div className={styles.moon}>
            <Moon />
          </div>
          <div className={styles.sun}>
            <Sun />
          </div>
        </div>
      </label>
    </div>
  );
}
