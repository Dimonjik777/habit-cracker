import { ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitGoal({
  value,
  onChange,
  active,
}: {
  value: string;
  onChange: (value: string) => void;
  active: boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value.trim();
    console.log("rawInput:", rawInput);

    // Allow empty input (treat as 0)
    if (rawInput === "") {
      onChange("");
      return;
    }
    // Validate full input (optional leading minus, digits only)
    const isValid = /^-?\d+$/.test(rawInput);
    if (!isValid) {
      return;
    }

    const numberValue = parseInt(rawInput, 10);
    if (numberValue >= 1 && numberValue <= 999999) {
      onChange(numberValue.toString());
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
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={value}
          onChange={handleChange}
          disabled={!active}
        />
      </div>
    </div>
  );
}
