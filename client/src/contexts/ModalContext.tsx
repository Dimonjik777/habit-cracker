"use client"

import { useState, createContext, useContext, ReactNode } from 'react';

type ModalContextType = {
  isActive: boolean,
  modalContent: ReactNode | null;
  openModal: (children: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside ModalProvider");
  return context;
}

export const ModalProvider = ({children} : {children: ReactNode}) => {

  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const openModal = (children : ReactNode) => {
    setIsActive(true);
    setModalContent(children);};
  const closeModal = () => {

    // Added setTimeout for fade out
    setIsActive(false);
    setTimeout(() => setModalContent(null), 300);
  };

  return (
    <ModalContext.Provider value={{ isActive, modalContent, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  )
}