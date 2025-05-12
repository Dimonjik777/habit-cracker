import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { HabitType } from "../../../../types/HabitType";
import { safeParseDate } from "../../../../helpers/date/safeParseDate";
import { getWeekday } from "../../../../helpers/date/getWeekday";
import dayjs from "dayjs";
import ChartsCustomTooltip from "./ChartsCustomTooltip";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";
import ChartWrapper from "./ChartWrapper";

export default function HistoryChart({
  chosenHabit,
}: {
  chosenHabit: HabitType;
}) {
  const getHistoryData = (chosenHabit: HabitType) => {
    const history = chosenHabit?.history;
    if (history) {
      const historyArray = Object.entries(history);

      const createdAtDate = safeParseDate(chosenHabit.createdAt);
      const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

      let date = new Date(createdAtDate);
      const data = [];
      while (date < tomorrow) {
        const weekday = getWeekday(date);
        if (chosenHabit.days.includes(weekday)) {
          // Find the historyEntry
          const historyEntry = historyArray.find(
            ([entryDate]) =>
              safeParseDate(entryDate).getTime() === date.getTime()
          );
          let value: number = 0;
          // Check if the entry exists
          if (historyEntry) {
            if (chosenHabit.type === "check") {
              const isCompleted = historyEntry?.[1]?.isCompleted ?? false;
              // it can be either 0 or 1
              value = isCompleted ? 1 : 0;
            } else if (chosenHabit.type === "track" && chosenHabit.goal != 0) {
              const progress = historyEntry?.[1]?.goalProgress ?? 0;
              // it is equal to goalProgress
              value = progress;
            }
          }

          // Make short date label
          const shortDate = dayjs(date).format("DD/MM");

          // Push date label and history value to the data array
          data.push({
            date: shortDate,
            value: value,
          });
        }
        // Move to the next date
        date.setDate(date.getDate() + 1);
      }
      return data;
    }
    return [];
  };
  const [data, setData] = useState(getHistoryData(chosenHabit));
  useEffect(() => {
    setData(getHistoryData(chosenHabit));
  }, [chosenHabit]);
  return (
    <ChartWrapper title="History: ">
      <div
        className={styles.chartInner}
        style={{
          minWidth: `${data.length * 50}px`,
        }}
      >
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <Bar
                dataKey="value"
                fill="var(--primary-color)"
                isAnimationActive={false}
                activeBar={{
                  fill: "var(--primary-color)",
                  filter: "brightness(1.1)",
                }}
              />
              {chosenHabit.type == "track" && <CartesianGrid stroke="#ccc" />}
              <XAxis dataKey="date" />
              <Tooltip content={<ChartsCustomTooltip />} cursor={false} />
              {chosenHabit.type == "check" && (
                <YAxis
                  domain={[0, 1]}
                  ticks={[0, 1]}
                  tickFormatter={(value) => (value === 1 ? "Yes" : "No")}
                />
              )}
              {chosenHabit.type == "track" && <YAxis domain={[]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartWrapper>
  );
}
