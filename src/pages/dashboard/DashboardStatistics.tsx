import { useEffect, useState } from "react";
import { useHabit } from "../../contexts/HabitContext";
import { HabitType } from "../../types/HabitType";
import ConsistencyChart from "../../components/dashboard/statistics/charts/ConsistencyChart";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";

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
      <>
        {habitsArray.length != 0 ? (
          <>
            <div className={styles.chooseHabitContainer}>
              <h3>Choose a habit:</h3>
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
            </div>
            {/* Chart Section */}
            {chosenHabit ? (
              <>
                {Object.values(chosenHabit.history).length > 0 ? (
                  <ConsistencyChart chosenHabit={chosenHabit} />
                ) : (
                  <div className={styles.textCenter}>
                    <h3>This habit has no history records yet</h3>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.textCenter}>
                <h3>No habit chosen yet</h3>
              </div>
            )}
          </>
        ) : (
          <div className={styles.textCenter}>
            <h2>No habits to choose from</h2>
          </div>
        )}
      </>
    </div>
  );
}
