"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "./UserContext";
import { HabitType } from "../helpers/type-habit";

type Habits = { [id: string]: HabitType };

type promiseObj = Promise<{ ok: boolean; message: string }>;
type updateHabitData = Omit<Omit<HabitType, "createdAt">, "history">;

type HabitContextType = {
  habits: Habits;
  getHabit: (id: string) => Promise<HabitType>;
  createHabit: (habit: Omit<HabitType, "id">) => promiseObj;
  updateHabit: (habitData: updateHabitData) => promiseObj;
  deleteHabit: (id: string) => promiseObj;
  setHabitHistoryRecord: (
    habitInstance: HabitInstance,
    date: string
  ) => promiseObj;
};

type HabitInstance = {
  habitId: string;
  title: string;
  type: "check" | "track";
  goal?: number;
  isCompleted: boolean;
  goalProgress?: number;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [habits, setHabits] = useState<Habits>({});

  const fetchHabits = async (): Promise<Record<string, Habits>> => {
    return JSON.parse(localStorage.getItem("habits") || "{}");
  };

  const setHabitsOnLoad = async () => {
    if (user.role === "registered" && user.email) {
      const retrievedHabits = await fetchHabits();
      setHabits(retrievedHabits[user.email] || {});
    }
  };

  const setHabitsToLocalStorage = async (habits: Habits) => {
    if (user.role === "registered" && user.email) {
      const retrievedHabits = await fetchHabits();
      localStorage.setItem(
        "habits",
        JSON.stringify({ ...retrievedHabits, [user.email]: habits })
      );
    }
  };

  const getHabit = async (id: string) => {
    return habits[id];
  };

  const createHabit = async (habitData: Omit<HabitType, "id">) => {
    const id = Date.now().toString();
    const newHabit: HabitType = {
      id,
      ...habitData,
    };

    // Optionally prevent duplicate titles if needed
    const titleExists = Object.values(habits).some(
      (h) => h.title === habitData.title
    );
    if (titleExists) {
      return { ok: false, message: "Title is in use" };
    }

    setHabits((prev) => ({
      ...prev,
      [id]: newHabit,
    }));

    return { ok: true, message: "Habit created successfully!" };
  };

  const updateHabit = async (data: updateHabitData) => {
    const oldHabit = await getHabit(data.id);
    if (!oldHabit) {
      return { ok: false, message: "Habit not found" };
    }
    const newHabit: HabitType = {
      ...oldHabit,
      ...data,
    };
    setHabits((prev) => ({
      ...prev,
      [data.id]: newHabit,
    }));

    return { ok: true, message: "Habit updated successfully!" };
  };
  const deleteHabit = async (id: string) => {
    if (!getHabit(id)) {
      return { ok: false, message: "Habit not found" };
    }
    setHabits((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    return { ok: true, message: "Habit deleted successfully!" };
  };
  const setHabitHistoryRecord = async (
    habitInstance: HabitInstance,
    date: string
  ) => {
    const habitsCopy = JSON.parse(JSON.stringify(habits)); // deep copy
    const habit = habitsCopy[habitInstance.habitId];
    if (!habit) {
      return { ok: false, message: "Habit not found" };
    }
    habit.history[date] = {
      isCompleted: habitInstance.isCompleted,
      goalProgress: habitInstance.goalProgress,
    };
    const res = await updateHabit(habit);
    console.log(res);
    return res;
  };
  useEffect(() => {
    if (user.role == "registered") {
      setHabitsOnLoad();
    }
  }, [user.role]); // this way the user doesn't have to reload the page after logging in to get their habits displayed

  useEffect(() => {
    if (Object.keys(habits).length > 0) {
      setHabitsToLocalStorage(habits);
    }
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        getHabit,
        createHabit,
        updateHabit,
        deleteHabit,
        setHabitHistoryRecord,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabit must be used within a HabitProvider");
  }
  return context;
};
