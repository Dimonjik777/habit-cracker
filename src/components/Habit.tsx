import { useState, useEffect, useRef } from "react";
import { useModal } from "../contexts/ModalContext";
import { useHabit } from "../contexts/HabitContext";
import ActionsIcon from "/src/assets/three-dots.svg?react";
import styles from "/src/styles/modules/habit.module.scss";
import DeleteHabit from "./habit-form/DeleteHabit";

type HabitInstanceType = {
  habitId: string;
  title: string;
  type: "check" | "track";
  goal?: number;
  isCompleted: boolean;
  goalProgress?: number;
};
export default function Habit({
  habit,
  onClick,
  disabled,
}: {
  habit: HabitInstanceType;
  onClick: () => void;
  disabled: boolean;
}) {
  const { openModal, closeModal } = useModal();
  const { deleteHabit } = useHabit();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const openDelete = (_: React.MouseEvent) => {
    const handleSubmit = async () => {
      const res = await deleteHabit(habit.habitId);
      let msg;
      if (res) {
        msg = res.message;
      } else {
        msg = "Error fetching response";
      }
      closeModal();
      setTimeout(() => {
        alert(msg);
      }, 200);
    };
    openModal(
      <DeleteHabit handleSubmit={handleSubmit} habitTitle={habit.title} />
    );
  };
  return (
    <div ref={ref} className={styles.container}>
      <div className={`${styles.main} ${disabled ? styles.disabled : ""}`}>
        <h3>{habit.title}</h3>
        {habit.type == "check" && (
          <span
            className={`${styles.checkbox} ${
              habit.isCompleted ? styles.checked : ""
            }`}
            onClick={onClick}
          ></span>
        )}
        {habit.type == "track" && (
          <span
            className={`${styles.goal} ${habit.isCompleted ? styles.done : ""}`}
            onClick={onClick}
          >
            {habit.goalProgress}
          </span>
        )}
      </div>
      <div
        className={styles.actions}
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <ActionsIcon />
      </div>
      <div
        className={`${styles.dropdownContainer} ${menuOpen ? styles.open : ""}`}
      >
        <div className={styles.selectOptions}>
          <div className={styles.option}>Edit</div>
          <div className={styles.option} onClick={openDelete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
