import { PieChart, Pie, Cell } from "recharts";
import styles from "/src/styles/modules/dashboard/right-sidebar/habits-pie-chart.module.scss";

export default function HabitsPieChart() {
  const habits = [
    { title: "Drink", isComplete: true },
    { title: "Water", isComplete: true },
    { title: "Learn", isComplete: false },
  ];

  const totalComplete = habits.filter((element) => element.isComplete).length;
  const totalUncomplete = habits.length - totalComplete;
  const completeRate = Math.floor((totalComplete / habits.length) * 100);

  const data = [
    { name: "Complete", value: totalComplete },
    { name: "Uncomplete", value: totalUncomplete },
  ];

  const COLORS = ["#F96363", "#C7C7C7"];

  return (
    <div className={styles.container}>
      <h1 className={styles.complete__percent}>{`${completeRate}%`}</h1>
      <p className={styles.complete__desc}>Current day`s progress</p>
      <PieChart width={270} height={270}>
        <Pie dataKey="value" data={data} innerRadius={115} outerRadius={135}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
