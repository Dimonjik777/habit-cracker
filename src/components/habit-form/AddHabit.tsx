import HabitForm from "./HabitForm";
import FormButton from "./FormButton";
import { useModal } from "../../contexts/ModalContext";
import { useState, ChangeEvent, useEffect } from "react";
import HabitTitleInput from "./HabitTitleInput";
import HabitTypeSelect from "./HabitTypeSelect";
import HabitFrequency from "./HabitFrequency";
import HabitGoal from "./HabitGoal";
import HabitNotify from "./HabitNotify";

import styles from "/src/styles/modules/habit-form.module.scss";

export default function AddHabit() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { closeModal } = useModal();
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
  return (
    <HabitForm>
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
          setData({ ...data, notify: value });
        }}
        onTimeChange={(value: string) => {
          setData({ ...data, notifyTime: value });
        }}
      />
      <div className={styles.submitContainer}>
        <div className={styles.buttonContainer}>
          <FormButton
            type="primary"
            value="Add habit"
            disabled={disabled}
            action={() => {}}
          />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton type="secondary" value="Cancel" action={closeModal} />
        </div>
      </div>
    </HabitForm>
  );
}
