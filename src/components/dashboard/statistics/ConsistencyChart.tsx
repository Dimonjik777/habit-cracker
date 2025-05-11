import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { safeParseDate } from "../../../helpers/date-parser";
import { getWeekday } from "../../../helpers/get-weekday";
import { HabitType } from "../../../helpers/type-habit";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";
import { useState, useRef, useEffect } from "react";
import ChartsCustomTooltip from "./charts/ChartsCustomTooltip";

export default function ConsistencyChart({
  chosenHabit,
}: {
  chosenHabit: HabitType;
}) {
  const getConsistencyData = (chosenHabit: HabitType) => {
    // 1. get chosenHabit's history
    const history = chosenHabit?.history;
    if (history) {
      // 2. create a historyArray that holds the date key at index 0
      // and the history object at index 1
      const historyArray = Object.entries(history);
      // 3. Based on this array, start counting from the chosenHabit's
      // createdAt date to today's date
      const createdAtDate = safeParseDate(chosenHabit.createdAt);
      const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

      let date = new Date(createdAtDate);
      const data = [];

      let totalScheduled = 0;
      let totalAchieved = 0;

      while (date < tomorrow) {
        const weekday = getWeekday(date);

        // 4. Check if the weekday is in days property
        if (chosenHabit.days.includes(weekday)) {
          // 5. Increment total scheduled
          totalScheduled++;

          // Find the historyEntry
          const historyEntry = historyArray.find(
            ([entryDate]) =>
              safeParseDate(entryDate).getTime() === date.getTime()
          );

          let completionRatio = 0;
          // Check if the entry exists
          if (historyEntry) {
            if (chosenHabit.type === "check") {
              const isCompleted = historyEntry?.[1]?.isCompleted ?? false;
              // it can be either 0 or 1
              completionRatio = isCompleted ? 1 : 0;
            } else if (chosenHabit.type === "track" && chosenHabit.goal != 0) {
              const progress = historyEntry?.[1]?.goalProgress ?? 0;
              // it can be any number from 0 to 1
              completionRatio = Math.min(progress / chosenHabit.goal, 1);
            }
          }
          // set totalAchieved to (totalAchieved + completionRatio)
          totalAchieved += completionRatio;

          // Calculate the date's consistency percentage
          const cumulativeConsistency = (totalAchieved / totalScheduled) * 100;

          // Make short date label
          const shortDate = dayjs(date).format("DD/MM");

          // Push date label and consistency value to the data array
          data.push({
            date: shortDate,
            value: Math.round(cumulativeConsistency),
          });
        }
        // Move to the next date
        date.setDate(date.getDate() + 1);
      }

      return data;
    }
    return [];
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll left to show the latest data to user
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [chosenHabit]);
  const [data, setData] = useState(getConsistencyData(chosenHabit));
  useEffect(() => {
    setData(getConsistencyData(chosenHabit));
  }, [chosenHabit]);
  return (
    <div className={styles.consistencyContainer}>
      <h3>Consistency: </h3>
      <div className={styles.chartContainer}>
        <div className={styles.scrollWrapper} ref={scrollRef}>
          <div
            className={styles.chartInner}
            style={{
              minWidth: `${data.length * 80}px`,
            }}
          >
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <Tooltip content={<ChartsCustomTooltip />} />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
