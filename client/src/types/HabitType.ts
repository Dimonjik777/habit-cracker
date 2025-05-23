type HistoryEntry = {
  isCompleted: boolean;
  goalProgress?: number;
};
export type HabitType = {
  id: string;
  createdAt: string;
  title: string;
  type: "check" | "track";
  days: string[];
  goal: string;
  notify: boolean;
  notifyTime: string;
  history: {
    [date: string]: HistoryEntry;
  };
};
