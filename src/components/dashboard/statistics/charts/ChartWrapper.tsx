import { ReactNode, useEffect, useRef } from "react";
import styles from "/src/styles/modules/dashboard/statistics/dashboard-statistics.module.scss";

export default function ChartWrapper({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll left to show the latest data to user
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [children]);
  return (
    <div className={styles.chartSectionContainer}>
      <h3>{title}</h3>
      <div className={styles.chartContainer}>
        <div className={styles.scrollWrapper} ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
