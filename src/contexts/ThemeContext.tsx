"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null);

  useEffect(() => {
    // Access localStorage safely after the component mounts
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme === "dark") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (darkTheme !== null) {
      // Update localStorage and document attribute only when darkTheme is determined
      localStorage.setItem("theme", darkTheme ? "dark" : "light");
    }
  }, [darkTheme]);
  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
  };
  if (darkTheme === null) {
    return <div className="">Loading...</div>;
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
