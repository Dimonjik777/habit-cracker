import { ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form.module.scss";

export default function HabitGoal({
  value,
  onChange,
  active,
}: {
  value: number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  active: boolean;
}) {
  return (
    <div
      className={`${styles.habitGoalContainer} ${
        active ? "" : styles.inactive
      }`}
    >
      <div className={styles.title}>Goal:</div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="0"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
