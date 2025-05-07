import ActionsIcon from "/src/assets/three-dots.svg?react";
import styles from "/src/styles/modules/habit.module.scss";

type HabitInstanceType = {
  title: string;
  type: "check" | "track";
  goal?: number;
  isCompleted: boolean;
  goalProgress?: number;
};
export default function Habit({
  habit,
  onClick,
}: {
  habit: HabitInstanceType;
  onClick: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>{habit.title}</h3>
        {habit.type == "check" && (
          <span
            className={`${styles.checkbox} ${
              habit.isCompleted ? styles.checked : ""
            }`}
            onClick={onClick}
          ></span>
        )}
        {habit.type == "track" && (
          <span
            className={`${styles.goal} ${habit.isCompleted ? styles.done : ""}`}
            onClick={onClick}
          >
            {habit.goal}
          </span>
        )}
      </div>
      <div className={styles.actions}>
        <ActionsIcon />
      </div>
    </div>
  );
}
