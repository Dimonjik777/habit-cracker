import { ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitGoal({
  value,
  onChange,
  active,
}: {
  value: number;
  onChange: (value: number) => void;
  active: boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow empty input to reset to 0
    if (input === "") {
      onChange(0);
      return;
    }

    // Convert to number and validate
    const numberValue = parseInt(input, 10);
    if (isNaN(numberValue)) return;

    // Limit to reasonable range (0-999999)
    if (numberValue >= -999999 && numberValue <= 999999) {
      onChange(numberValue);
    }
  };

  return (
    <div
      className={`${styles.habitGoalContainer} ${
        !active ? styles.inactive : ""
      }`}
    >
      <div className={styles.title}>Goal:</div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          min="-999999"
          max="999999"
          placeholder="0"
          value={value || ""}
          onChange={handleChange}
          disabled={!active}
        />
      </div>
    </div>
  );
}
