import { useEffect, useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";
import { useHabit } from "../contexts/HabitContext";

export default function Notifications() {
  const { user } = useUser();
  const { habits } = useHabit();
  const [notifiedToday, setNotifiedToday] = useState<{
    [habitId: string]: string;
  }>({});
  const notifiedRef = useRef<{ [habitId: string]: string }>({});
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (user.role !== "registered") return;

    if (
      "Notification" in window &&
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }

    const todayStr = new Date().toDateString();
    const stored = JSON.parse(
      sessionStorage.getItem(`habits-notified-${todayStr}`) ?? "{}"
    );
    setNotifiedToday(stored);
    notifiedRef.current = stored;

    const checkNotifications = () => {
      const now = new Date();
      const currentTimeStr = `${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}`;
      const todayStr = now.toDateString();

      Object.entries(habits).forEach(([habitId, habit]) => {
        const alreadyNotified = notifiedRef.current[habitId] === todayStr;

        if (
          habit.notify &&
          habit.notifyTime === currentTimeStr &&
          !alreadyNotified
        ) {
          new Notification(habit.title);
          const updated = { ...notifiedRef.current, [habitId]: todayStr };
          setNotifiedToday(updated);
          notifiedRef.current = updated;
        }
      });
    };

    intervalRef.current = window.setInterval(checkNotifications, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user.role, habits]);

  useEffect(() => {
    const todayStr = new Date().toDateString();
    sessionStorage.setItem(
      `habits-notified-${todayStr}`,
      JSON.stringify(notifiedToday)
    );
  }, [notifiedToday]);

  return null;
}
