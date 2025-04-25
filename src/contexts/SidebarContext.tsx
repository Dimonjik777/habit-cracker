import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  openLeftSidebar: () => void;
  openRightSidebar: () => void;
  closeLeftSidebar: () => void;
  closeRightSidebar: () => void;
};
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const openLeftSidebar = () => setLeftSidebarOpen(true);
  const openRightSidebar = () => setRightSidebarOpen(true);
  const closeLeftSidebar = () => setLeftSidebarOpen(false);
  const closeRightSidebar = () => setRightSidebarOpen(false);
  return (
    <SidebarContext.Provider
      value={{
        leftSidebarOpen,
        rightSidebarOpen,
        openLeftSidebar,
        openRightSidebar,
        closeLeftSidebar,
        closeRightSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
