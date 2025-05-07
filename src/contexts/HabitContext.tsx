"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "./UserContext";

type promiseObj = Promise<{ ok: boolean; message: string }>;

type HabitContextType = {
  habits: Habit[];
  createHabit: (habit: Habit) => promiseObj;
  updateHabit: (habit: Habit, oldTitle: string) => promiseObj;
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};

type HistoryEntry = {
  isCompleted: boolean;
  goalProgress?: number;
};
type Habit = {
  createdAt: string;
  title: string;
  type: "check" | "track";
  days: string[];
  goal: number;
  notify: boolean;
  notifyTime: string;
  history: {
    [date: string]: HistoryEntry;
  };
};

// The HabitContext is sort of a backend mockup, so every function is async
const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  // An object that refferences all of current user's global objects (not history instances, histories are nested)
  const [habits, setHabits] = useState<Habit[]>([]);
  // Fetch global object of all users' habits
  const fetchHabits = async () => {
    return JSON.parse(localStorage.getItem("habits") || "[]");
  };
  // Save an object of all user's habits in memory
  const setHabtitsOnLoad = async () => {
    if (user.role == "registered" && user.email) {
      const retreivedHabits = await fetchHabits();
      if (retreivedHabits[user.email]) {
        setHabits(retreivedHabits[user.email]);
      } else {
        setHabits([]);
        localStorage.setItem(
          "habits",
          JSON.stringify({ ...retreivedHabits, [user.email]: [] })
        );
      }
    }
  };
  // Update the global object of all users' habits (only the current user's part)
  const setHabitsToLocalStorage = async (habits: Habit[]) => {
    if (user.role == "registered" && user.email) {
      const retreivedHabits = await fetchHabits();
      localStorage.setItem(
        "habits",
        JSON.stringify({ ...retreivedHabits, [user.email]: habits })
      );
    }
  };
  // save a new habit
  const createHabit = async (habit: Habit) => {
    const duplicates = habits.filter((h) => h.title == habit.title);
    if (duplicates.length != 0) {
      return { ok: false, message: "Title is in use" };
    } else {
      setHabits([...habits, habit]);
      return { ok: true, message: "Habit created successfully!" };
    }
  };
  // update an existing habit
  const updateHabit = async (habit: Habit, oldTitle: string) => {
    const duplicates = habits.filter((h) => h.title == oldTitle);
    if (duplicates.length != 0) {
      setHabits([...habits.filter((h) => h.title != habit.title), habit]);
      return { ok: true, message: "Habit updated successfully!" };
    } else {
      return { ok: false, message: "Habit does not exist, nothing to update" };
    }
  };
  // Load current user's habits object from localStorage on page load
  useEffect(() => {
    setHabtitsOnLoad();
  }, []);
  // Save new habits to local storage every time a change is made
  useEffect(() => {
    if (habits.length > 0) {
      setHabitsToLocalStorage(habits);
    }
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{ habits, createHabit, updateHabit, setHabits }}
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
