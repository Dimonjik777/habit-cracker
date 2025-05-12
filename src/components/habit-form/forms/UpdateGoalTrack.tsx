import HabitForm from "../HabitForm";
import { useState, ChangeEvent } from "react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function UpdateGoalTrack({
  val,
  placeholder,
  handleSubmit,
}: {
  val: number;
  placeholder: string;
  handleSubmit: (val: number) => void;
}) {
  const [progress, setProgress] = useState<number | null>(val);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow empty input to reset to 0
    if (input === "") {
      setProgress(null);
      return;
    }

    // Convert to number and validate
    const numberValue = parseInt(input, 10);
    if (isNaN(numberValue)) return;

    // Limit to reasonable range (0-999999)
    if (numberValue >= -999999 && numberValue <= 999999) {
      setProgress(numberValue);
    }
  };
  return (
    <div className={styles.updateGoalFormContainer}>
      <HabitForm
        handleSubmit={() => handleSubmit(Number(progress))}
        disabled={progress === null}
        submitTitle="Save track"
        error=""
      >
        <div className={styles.updateGoalContentContainer}>
          <label htmlFor="update-goal-track">Enter new value:</label>
          <input
            type="number"
            id="update-goal-track"
            className={styles.input}
            onChange={handleChange}
            value={progress ?? ""}
            placeholder={placeholder}
          />
        </div>
      </HabitForm>
    </div>
  );
}
