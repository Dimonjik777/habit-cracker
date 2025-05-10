import { useEffect, useState } from "react";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";
import { useHabit } from "../../contexts/HabitContext";
import { HabitType } from "../../helpers/type-habit";

export default function DashboardStatistics() {
  const { habits } = useHabit();
  const [habitsArray, setHabitsArray] = useState(Object.values(habits));
  const [chosenHabit, setChosenHabit] = useState<HabitType | undefined>(
    undefined
  );
  useEffect(() => {
    setHabitsArray(Object.values(habits));
  }, [habits]);
  useEffect(() => {
    console.log(chosenHabit);
  }, [chosenHabit]);
  const isActive = (habit: HabitType) => {
    if (chosenHabit) {
      return chosenHabit.id == habit.id ? styles.active : "";
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.chooseHabitContainer}>
        <h3>Choose a habit:</h3>
        {habitsArray.length != 0 ? (
          <div className={styles.habitCardsContainer}>
            {habitsArray.map((habit) => (
              <span
                key={habit.id}
                className={`${styles.habitCard} ${isActive(habit)}`}
                onClick={() => setChosenHabit(habit)}
              >
                {habit.title}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noHabitsContainer}>
            <h2>No habits to choose from</h2>
          </div>
        )}
      </div>
    </div>
  );
}
