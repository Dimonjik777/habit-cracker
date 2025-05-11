import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import styles from "/src/styles/modules/dashboard/statistics/charts/tooltip.module.scss";

type Props = TooltipProps<ValueType, NameType>;

export default function ChartsCustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      {payload.map((item, index) => (
        <p key={index} className={styles.item}>
          {item.name}: {item.value}%
        </p>
      ))}
    </div>
  );
}
