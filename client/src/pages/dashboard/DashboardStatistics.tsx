import { useEffect, useState } from "react";
import { useHabit } from "../../contexts/HabitContext";
import { HabitType } from "../../types/HabitType";
import ConsistencyChart from "../../components/dashboard/statistics/charts/ConsistencyChart";
import HistoryChart from "../../components/dashboard/statistics/charts/HistoryChart";
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
  const isActive = (habit: HabitType) => {
    if (chosenHabit) {
      return chosenHabit.id == habit.id ? styles.active : "";
    }
  };
  const render = () => {
    return (
      <>
        {habitsArray.length != 0 ? (
          <>
            {renderChooseHabits()}
            {chosenHabit ? (
              <>{renderCharts(chosenHabit)}</>
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
    );
  };
  const renderChooseHabits = () => {
    return (
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
      </>
    );
  };
  const renderCharts = (chosenHabit: HabitType) => {
    return (
      <>
        {Object.values(chosenHabit.history).length > 0 ? (
          <>
            <ConsistencyChart chosenHabit={chosenHabit} />
            <HistoryChart chosenHabit={chosenHabit} />
          </>
        ) : (
          <div className={styles.textCenter}>
            <h3>This habit has no history records yet</h3>
          </div>
        )}
      </>
    );
  };
  return <div className={styles.container}>{render()}</div>;
}
