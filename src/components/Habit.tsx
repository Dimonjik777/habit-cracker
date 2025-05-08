import { useState, useEffect, useRef } from "react";
import { useModal } from "../contexts/ModalContext";
import { useHabit } from "../contexts/HabitContext";
import DeleteHabit from "./habit-form/DeleteHabit";
import EditHabit from "./habit-form/EditHabit";
import ActionsIcon from "/src/assets/three-dots.svg?react";
import styles from "/src/styles/modules/habit.module.scss";

type HabitInstanceType = {
  habitId: string;
  title: string;
  type: "check" | "track";
  goal?: number;
  isCompleted: boolean;
  goalProgress?: number;
};
export default function Habit({
  habit: habitInstance,
  onClick,
  disabled,
}: {
  habit: HabitInstanceType;
  onClick: () => void;
  disabled: boolean;
}) {
  const { openModal, closeModal } = useModal();
  const { deleteHabit, getHabit } = useHabit();
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
      const res = await deleteHabit(habitInstance.habitId);
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
      <DeleteHabit
        handleSubmit={handleSubmit}
        habitTitle={habitInstance.title}
      />
    );
  };
  const openEdit = async (_: React.MouseEvent) => {
    const habit = await getHabit(habitInstance.habitId);
    if (habit) {
      openModal(<EditHabit habit={habit} />);
    } else {
      alert("Habit not found");
    }
  };
  return (
    <div ref={ref} className={styles.container}>
      <div className={`${styles.main} ${disabled ? styles.disabled : ""}`}>
        <h3>{habitInstance.title}</h3>
        {habitInstance.type == "check" && (
          <span
            className={`${styles.checkbox} ${
              habitInstance.isCompleted ? styles.checked : ""
            }`}
            onClick={onClick}
          ></span>
        )}
        {habitInstance.type == "track" && (
          <span
            className={`${styles.goal} ${
              habitInstance.isCompleted ? styles.done : ""
            }`}
            onClick={onClick}
          >
            {habitInstance.goalProgress}
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
          <div className={styles.option} onClick={openEdit}>
            Edit
          </div>
          <div className={styles.option} onClick={openDelete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
