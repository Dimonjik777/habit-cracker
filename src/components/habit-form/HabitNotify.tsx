import { useEffect, useState } from "react";
import Check from "/src/assets/check.svg?react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitNotify({
  initialValue,
  initialTimeValue,
  onChange,
  onTimeChange,
}: {
  initialValue?: boolean;
  initialTimeValue?: string;
  onChange: (value: boolean) => void;
  onTimeChange: (value: string) => void; // optional callback
}) {
  const [notifyEnabled, setNotifyEnabled] = useState<boolean>(
    Boolean(initialValue)
  );
  useEffect(() => {
    if (initialTimeValue) {
      const [hours, minutes] = initialTimeValue.split(":");
      setHours(hours);
      setMinutes(minutes);
    }
  }, [initialTimeValue]);
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");

  const handleToggleNotify = () => {
    const newValue = !notifyEnabled;
    setNotifyEnabled(newValue);
    onChange(newValue);
    updateTime(hours, minutes);
  };

  const updateTime = (h: string, m: string) => {
    const time = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
    onTimeChange(time);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length <= 2) {
      if (parseInt(val) > 23) val = "23";
      setHours(val);
      updateTime(val, minutes);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length <= 2) {
      if (parseInt(val) > 59) val = "59";
      setMinutes(val);
      updateTime(hours, val);
    }
  };

  return (
    <div className={styles.notifyContainer}>
      <div className={styles.checkboxContainer}>
        <span
          className={`${styles.checkbox} ${
            notifyEnabled ? styles.checked : ""
          }`}
          onClick={handleToggleNotify}
        >
          <Check />
        </span>
        <span className={styles.label}>Notify me</span>
      </div>
      <div
        className={`${styles.timeContainer} ${
          notifyEnabled ? "" : styles.inactive
        }`}
      >
        <div className={styles.inputContainer}>
          <input
            type="number"
            className={styles.input}
            placeholder="00"
            value={hours}
            onChange={handleHoursChange}
            min="0"
            max="23"
            disabled={!notifyEnabled}
            minLength={0}
            maxLength={2}
          />
        </div>
        <span>:</span>
        <div className={styles.inputContainer}>
          <input
            type="number"
            className={styles.input}
            placeholder="00"
            value={minutes}
            onChange={handleMinutesChange}
            min="0"
            max="59"
            disabled={!notifyEnabled}
          />
        </div>
      </div>
    </div>
  );
}
