import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useHabit } from "../contexts/HabitContext";
import Habit from "./Habit";
import styles from "/src/styles/modules/habits.module.scss";

export default function Habits({ date }: { date: string }) {
  type HabitInstanceType = {
    title: string;
    type: "check" | "track";
    goal?: number;
    isCompleted: boolean;
    goalProgress?: number;
  };
  const [habitInstances, setHabitInstances] = useState<HabitInstanceType[]>([]);
  const { user } = useUser();
  const getWeekday = (dateString: string) => {
    const dateObj = new Date(dateString);
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[dateObj.getDay()];
  };
  const safeParseDate = (str: string) => {
    const [dd, mm, yyyy] = str.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

  // Import habits as userHabits for better understanding and readability
  const { habits: userHabits } = useHabit();

  useEffect(() => {
    if (user.role == "registered" && user.email) {
      const weekday = getWeekday(date);
      let instances: HabitInstanceType[];
      //  check if the requested day is not a day in future
      if (new Date().getTime() >= safeParseDate(date).getTime()) {
        instances = userHabits
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
              return {
                title: habit.title,
                type: habit.type,
                goal: habit?.goal,
                ...history[date],
              };
            }
          })
          .filter(Boolean);
      } else {
        instances = [];
      }
      setHabitInstances(instances);
    }
  }, [date, userHabits]);

  useEffect(() => {}, [habitInstances]);
  return (
    <div className={styles.container}>
      <div className={styles.activeHabits}>
        {habitInstances &&
          habitInstances.map((habit) => {
            if (!habit.isCompleted) {
              let handleClick = () => alert("Not yet implemented");
              return (
                <div key={habit.title}>
                  <Habit habit={habit} onClick={handleClick} />
                </div>
              );
            }
          })}
      </div>
      {habitInstances.length == 0 && (
        <div className={styles.noHabits}>
          <h2>No habit records for this day</h2>
        </div>
      )}
    </div>
  );
}
