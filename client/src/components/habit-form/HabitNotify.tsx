import { useRef, useState } from "react";
import Check from "/src/assets/check.svg?react";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function HabitNotify({
  checkboxValue,
  timeValue,
  onChange,
  onTimeChange,
}: {
  checkboxValue: boolean;
  timeValue: string;
  onChange: (value: boolean) => void;
  onTimeChange: (value: string) => void;
}) {
  const [notifyEnabled, setNotifyEnabled] = useState<boolean>(
    Boolean(checkboxValue)
  );
  const hours = timeValue.split(":")[0];
  const minutes = timeValue.split(":")[1];

  const handleToggleNotify = () => {
    const newValue = !notifyEnabled;
    setNotifyEnabled(newValue);
    onChange(newValue);
    updateTime(hours, minutes);
  };

  const updateTime = (h: string, m: string) => {
    const time = `${h}:${m}`;
    onTimeChange(time);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const isValid = /^-?\d+$/.test(val);
    if (!isValid && val !== "") {
      return;
    }
    if (val.length <= 2) {
      updateTime(val, minutes);
      if (val.length == 2) {
        if (parseInt(val) > 23) val = "23";
        // delay the focus so that two digits can be entered
        setTimeout(() => {
          minutesRef.current?.focus();
        }, 0);
      }
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const isValid = /^-?\d+$/.test(val);
    if (!isValid && val !== "") {
      return;
    }
    if (val.length <= 2) {
      if (parseInt(val) > 59) val = "59";
      updateTime(hours, val);
    }
  };
  const handleHoursBlur = () => {
    let h = parseInt(hours || "0", 10);
    if (isNaN(h) || h < 0) h = 0;
    if (h > 23) h = 23;
    const padded = h.toString().padStart(2, "0");
    updateTime(padded, minutes);
  };
  const handleMinutesBlur = () => {
    let m = parseInt(minutes || "0", 10);
    if (isNaN(m) || m < 0) m = 0;
    if (m > 59) m = 59;
    const padded = m.toString().padStart(2, "0");
    updateTime(hours, padded);
  };
  const minutesRef = useRef<HTMLInputElement>(null);
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
            type="string"
            inputMode="numeric"
            className={styles.input}
            placeholder="00"
            value={hours}
            onChange={handleHoursChange}
            onBlur={handleHoursBlur}
            disabled={!notifyEnabled}
          />
        </div>
        <span>:</span>
        <div className={styles.inputContainer}>
          <input
            type="string"
            inputMode="numeric"
            className={styles.input}
            placeholder="00"
            value={minutes}
            onChange={handleMinutesChange}
            onBlur={handleMinutesBlur}
            disabled={!notifyEnabled}
            ref={minutesRef}
          />
        </div>
      </div>
    </div>
  );
}
