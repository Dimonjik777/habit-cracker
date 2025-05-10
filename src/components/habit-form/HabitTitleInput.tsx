import { ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitTitleInput({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <div className={styles.habitTitle}>
      <input
        type="text"
        placeholder="Habit title..."
        className={styles.habitTitleInput}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
