import HabitForm from "./HabitForm";
import { useModal } from "../../contexts/ModalContext";
import { useState, ChangeEvent, useEffect } from "react";
import HabitTitleInput from "./HabitTitleInput";
import HabitFrequency from "./HabitFrequency";
import HabitGoal from "./HabitGoal";
import HabitNotify from "./HabitNotify";
import { useUser } from "../../contexts/UserContext";
import { useHabit } from "../../contexts/HabitContext";
import styles from "/src/styles/modules/habit-form.module.scss";

type Habit = {
  id: string;
  createdAt: string;
  title: string;
  type: "check" | "track";
  days: string[];
  goal: number;
  notify: boolean;
  notifyTime: string;
  history: {};
};

export default function EditHabit({ habit }: { habit: Habit }) {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { closeModal } = useModal();
  const { user } = useUser();
  const { updateHabit } = useHabit();
  type EditHabitData = {
    id: string;
    title: string;
    type: "check" | "track";
    days: string[];
    goal: number;
    notify: boolean;
    notifyTime: string;
  };
  const [data, setData] = useState<EditHabitData>({
    id: habit.id,
    title: habit.title,
    type: habit.type,
    days: habit.days,
    goal: habit?.goal ?? 0,
    notify: habit.notify,
    notifyTime: habit.notifyTime,
  });
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (
      !data.title ||
      data.days.length === 0 ||
      (data.type == "track" && data.goal == 0) ||
      (data.notify && !data.notifyTime)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [data]);
  const handleSubmit = async () => {
    const res = await fetchEditHabit(data);
    if (res) {
      const msg = res.message;
      if (res.ok) {
        closeModal();
        setTimeout(() => {
          alert(msg);
        }, 200);
      } else {
        setError(msg);
      }
    } else {
      setError("Error fetching response");
    }
  };

  const fetchEditHabit = async (data: EditHabitData) => {
    try {
      if (user.role === "registered" && user.email) {
        const res = await updateHabit(data);
        return res;
      }
    } catch (e) {
      console.error("Error updating habit:", e);
      return false;
    }
  };
  useEffect(() => {
    setError("");
  }, [data]);
  return (
    <HabitForm
      disabled={disabled}
      handleSubmit={handleSubmit}
      submitTitle="Update habit"
      error={error}
    >
      <HabitTitleInput
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (
            e.target instanceof HTMLInputElement &&
            e.target.value.length < 50
          ) {
            setData({ ...data, title: e.target.value });
          }
        }}
        value={data.title}
      />
      <div className={styles.habitSettings}>
        <HabitFrequency
          onChange={(days: string[]) => {
            setData({ ...data, days: days });
          }}
        />
        <HabitGoal
          value={data.goal}
          onChange={(val: number) => {
            setData({ ...data, goal: val });
          }}
          active={data.type == "track"}
        />
      </div>
      <HabitNotify
        onChange={(value: boolean) => {
          setData({ ...data, notify: value });
        }}
        onTimeChange={(value: string) => {
          setData({ ...data, notifyTime: value });
        }}
      />
    </HabitForm>
  );
}
