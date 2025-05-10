import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { useHabit } from "../../../contexts/HabitContext";
import { useModal } from "../../../contexts/ModalContext";
import UpdateGoalTrack from "../../habit-form/forms/UpdateGoalTrack";
import Habit from "./Habit";
import styles from "/src/styles/modules/dashboard/all/habits.module.scss";

export default function Habits({ date }: { date: string }) {
  type HabitInstanceType = {
    habitId: string;
    title: string;
    type: "check" | "track";
    goal?: number;
    isCompleted: boolean;
    goalProgress?: number;
  };
  const [habitInstances, setHabitInstances] = useState<HabitInstanceType[]>([]);
  const { user } = useUser();
  const { openModal, closeModal } = useModal();
  const getWeekday = (date: Date) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[date.getDay()];
  };
  const safeParseDate = (str: string) => {
    const [dd, mm, yyyy] = str.split("-");
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  };

  // Import habits as userHabits for better understanding and readability
  const { habits: userHabits, setHabitHistoryRecord } = useHabit();

  useEffect(() => {
    if (user.role == "registered" && user.email) {
      const weekday = getWeekday(safeParseDate(date));
      let instances: HabitInstanceType[];
      //  check if the requested day is not a day in future
      if (new Date().getTime() >= safeParseDate(date).getTime()) {
        instances = Object.values(userHabits)
          .map((habit: any) => {
            let history = habit.history;
            if (
              // check for the history record presence
              !history[date] &&
              // check that the habit is scheduled to be displayed on this day
              habit.days.includes(weekday) &&
              // check that the habit was created sooner than the chosen date
              safeParseDate(habit.createdAt).getTime() <=
                safeParseDate(date).getTime()
            ) {
              history[date] = {
                isComplete: false,
                goalProgress: 0,
              };
            }
            if (history[date]) {
              const habitInstance = {
                habitId: habit.id,
                title: habit.title,
                type: habit.type,
                goal: habit?.goal,
                ...history[date],
              };
              if (habit.type == "track") {
                return {
                  ...habitInstance,
                  isCompleted: habit.goal <= history[date].goalProgress,
                };
              } else {
                return habitInstance;
              }
            }
          })
          .filter(Boolean);
      } else {
        instances = [];
      }
      setHabitInstances(instances);
    }
  }, [date, userHabits]);

  // Handle track form value change
  // Handle the inner click event of a habit
  const handleHabitInstanceClick = (habit: HabitInstanceType) => {
    let updatedInstance: HabitInstanceType;
    if (habit.type == "check") {
      updatedInstance = { ...habit, isCompleted: !habit.isCompleted };
      setHabitInstances(() => {
        const filtered = habitInstances.filter((i) => {
          return i.title != habit.title;
        });
        return [...filtered, updatedInstance];
      });
      setHabitHistoryRecord(updatedInstance, date);
    } else {
      const handleSubmit = (val: number) => {
        updatedInstance = {
          ...habit,
          goalProgress: val,
          isCompleted: Boolean(val >= Number(habit.goal)),
        };
        setHabitInstances(() => {
          const filtered = habitInstances.filter((i) => {
            return i.title != habit.title;
          });
          // TODO: make update habit history record call to HabitContext
          return [...filtered, updatedInstance];
        });
        closeModal();
        setHabitHistoryRecord(updatedInstance, date);
      };
      openModal(
        <UpdateGoalTrack
          val={habit.goalProgress ?? 0}
          placeholder={String(habit.goal) ?? "0"}
          handleSubmit={(val: number) => handleSubmit(val)}
        />
      );
    }
  };

  const renderHabits = (condition?: string) => {
    const today = new Date();
    const parsedDate = safeParseDate(date);

    const isToday =
      parsedDate.getFullYear() === today.getFullYear() &&
      parsedDate.getMonth() === today.getMonth() &&
      parsedDate.getDate() === today.getDate();
    return habitInstances
      .filter((habit) => {
        if (condition == "completed") {
          return habit.isCompleted;
        } else {
          return !habit.isCompleted;
        }
      })
      .map((habit) => {
        return (
          <div key={habit.title}>
            <Habit
              habit={habit}
              onClick={() => handleHabitInstanceClick(habit)}
              disabled={!isToday}
            />
          </div>
        );
      });
  };
  return (
    <div className={styles.container}>
      {habitInstances.length > 0 && (
        <>
          <div className={styles.activeHabits}>
            {renderHabits("uncompleted")}
          </div>
          <div className={styles.completedHabits}>
            <h2>Completed habits</h2>
            {habitInstances.some((h) => h.isCompleted) ? (
              <>
                <div className={styles.habits}>{renderHabits("completed")}</div>
              </>
            ) : (
              <div className={styles.noHabits}>
                <h2>No habit marked as "completed"</h2>
              </div>
            )}
          </div>
        </>
      )}

      {habitInstances.length == 0 && (
        <div className={styles.noHabits}>
          <h2>No habit records for this day</h2>
        </div>
      )}
    </div>
  );
}
