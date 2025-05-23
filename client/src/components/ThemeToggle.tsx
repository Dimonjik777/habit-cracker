import Moon from "/src/assets/moon.svg?react";
import Sun from "/src/assets/sun.svg?react";
import styles from "/src/styles/modules/theme-toggle.module.scss";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { darkTheme, toggleTheme } = useTheme();
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={darkTheme}
        id="theme-toggle"
        onChange={toggleTheme}
      />
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
