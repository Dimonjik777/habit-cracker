import { useEffect, useState } from "react";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";
import { useHabit } from "../../contexts/HabitContext";

export default function DashboardStatistics() {
  const { habits } = useHabit();
  const [habitsArray, setHabitsArray] = useState(Object.values(habits));
  const [chosenHabit, setChosenHabit] = useState({ id: "" });
  useEffect(() => {
    setHabitsArray(Object.values(habits));
  }, [habits]);
  useEffect(() => {
    console.log(chosenHabit);
  }, [chosenHabit]);
  return (
    <div className={styles.container}>
      <div className={styles.chooseHabitContainer}>
        <h3>Choose a habit:</h3>
        <div className={styles.habitCardsContainer}>
          {habitsArray.map((habit) => (
            <span
              key={habit.id}
              className={`${styles.habitCard} ${
                chosenHabit.id == habit.id ? styles.active : ""
              }`}
              onClick={() => setChosenHabit(habit)}
            >
              {habit.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
