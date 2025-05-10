import { ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitTypeSelect({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.habitTypeSelect}>
      <div className={styles.title}>Type of habit:</div>
      <div className={styles.options}>
        <div className={styles.option}>
          <span className={styles.inputGroup}>
            <input
              type="radio"
              name="habit-type"
              id="habit-type-check"
              onChange={onChange}
              value={"check"}
            />
            <label className={styles.radio} htmlFor="habit-type-check"></label>
            <span className={styles.name}>Check</span>
          </span>
          <span className={styles.description}>
            Eg. "Drink 2L of water" or "Read 20 pages" (etiher done or not)
          </span>
        </div>
        <div className={styles.option}>
          <span className={styles.inputGroup}>
            <input
              type="radio"
              name="habit-type"
              id="habit-type-track"
              onChange={onChange}
              value={"track"}
            />
            <label className={styles.radio} htmlFor="habit-type-track"></label>
            <span className={styles.name}>Track</span>
          </span>
          <span className={styles.description}>
            Eg. "Drink water" or "Read a book" (hours, pages, liters, reps etc.)
          </span>
        </div>
      </div>
    </div>
  );
}
