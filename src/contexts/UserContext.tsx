"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserType = {
  role: "unregistered" | "registered";
  name?: string;
  email?: string;
  password?: string;
};
type UserData = {
  email: string;
  password: string;
};
type UserContextType = {
  user: UserType;
  login: (data: UserData) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Mockup user retrieval
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user) {
      setUser(user);
    } else {
      setUser({ role: "unregistered" });
    }
  }, []);

  // Mockup user update
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Mockup login
  const login = async (data: UserData) => {
    try {
      setUser({ ...data, role: "registered" });
      return true;
    } catch (e) {
      return false;
    }
  };

  // Mockup logout
  const logout = async () => {
    sessionStorage.removeItem("user");
    setUser({ role: "unregistered" });
    return false;
  };

  if (user === null) {
    return <div className="">Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
