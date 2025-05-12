import HabitForm from "../HabitForm";
import { useModal } from "../../../contexts/ModalContext";
import { useState, ChangeEvent, useEffect } from "react";
import HabitTitleInput from "../HabitTitleInput";
import HabitTypeSelect from "../HabitTypeSelect";
import HabitFrequency from "../HabitFrequency";
import HabitGoal from "../HabitGoal";
import HabitNotify from "../HabitNotify";
import { useUser } from "../../../contexts/UserContext";
import { useHabit } from "../../../contexts/HabitContext";
import styles from "/src/styles/modules/habit-form/habit-form.module.scss";

export default function AddHabit() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { closeModal } = useModal();
  const { user } = useUser();
  const { createHabit } = useHabit();
  type AddHabitData = {
    title: string;
    type: "check" | "track";
    days: string[];
    goal: number;
    notify: boolean;
    notifyTime: string;
  };
  const [data, setData] = useState<AddHabitData>({
    title: "",
    type: "check",
    days: ["mon", "tue", "wen", "thu", "fri", "sat", "sun"],
    goal: 0,
    notify: false,
    notifyTime: "00:00",
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
    const res = await fetchAddHabit(data);
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

  const fetchAddHabit = async (data: AddHabitData) => {
    try {
      if (user.role === "registered" && user.email) {
        const now = new Date();
        const createdAt = `${String(now.getDate()).padStart(2, "0")}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${now.getFullYear()}`;
        const res = await createHabit({
          ...data,
          notify: data.notify,
          createdAt,
          history: {},
        });
        return res;
      }
    } catch (e) {
      console.error("Error saving habit:", e);
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
      submitTitle="Add habit"
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
      <HabitTypeSelect
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setData({ ...data, type: e.target.value as "check" | "track" });
        }}
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
          setTimeout(() => {
            setData({ ...data, notify: value });
          }, 0);
        }}
        onTimeChange={(value: string) => {
          setData({ ...data, notifyTime: value });
        }}
      />
    </HabitForm>
  );
}
