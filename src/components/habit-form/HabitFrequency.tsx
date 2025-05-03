import styles from "/src/styles/modules/habit-form.module.scss";
import DropdownArrow from "/src/assets/dropdown-arrow.svg?react";
import { useEffect, useState } from "react";

export default function HabitFrequency({
  onChange,
}: {
  onChange: (days: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const days = ["mon", "tue", "wen", "thu", "fri", "sat", "sun"];
  const [selectedDays, setSelectedDays] = useState<string[]>(days);
  const [currentValue, setCurrentValue] = useState<string>("Daily");
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.selectContainer}`)) {
        setIsOpen(false);
      }
    });
  }, []);
  return (
    <div className={styles.habitFrequency}>
      <div className={styles.selectContainer}>
        <div className={styles.title}>Frequency:</div>
        <div
          className={`${styles.selectWrapper} ${isOpen ? styles.open : ""}`}
          onClick={toggleDropdown}
        >
          <div className={styles.selectLabel}>
            <div className={styles.text}>{currentValue}</div>
            <span className={styles.arrowContainer}>
              <DropdownArrow />
            </span>
          </div>
          <div className={styles.selectOptions}>
            <div
              className={styles.option}
              key={0}
              onClick={() => {
                setCurrentValue("Daily");
                setSelectedDays(days);
                onChange(days);
                setTimeout(() => {
                  setIsOpen(false);
                }, 0);
              }}
            >
              Daily
            </div>
            <div
              className={styles.option}
              key={1}
              onClick={() => {
                setCurrentValue("Weekly");
                setSelectedDays(selectedDays);
                setTimeout(() => {
                  setIsOpen(false);
                }, 0);
              }}
            >
              Weekly
            </div>
          </div>
          {/* */}
        </div>
      </div>
      <div
        className={`${styles.daysContainer} ${
          currentValue == "Weekly" ? "" : styles.inactive
        }`}
      >
        {/* <div className="">Mon</div>
        <div className="">Tue</div>
        <div className="">Wen</div>
        <div className="">Thu</div>
        <div className="">Fri</div>
        <div className="">Sat</div>
        <div className="">Sun</div> */}
        {days.map((day, index) => {
          return (
            <div
              key={index}
              className={`${styles.day} ${
                selectedDays.includes(day) ? styles.selected : ""
              }`}
              onClick={() => {
                if (selectedDays.includes(day)) {
                  const newDays = selectedDays.filter((d) => d !== day);
                  onChange(newDays);
                  setSelectedDays(newDays);
                } else {
                  const newDays = [...selectedDays, day];
                  onChange(newDays);
                  setSelectedDays(newDays);
                }
              }}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
