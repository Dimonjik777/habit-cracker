import styles from "/src/styles/modules/modal-window.module.scss";
import { useModal } from "../contexts/ModalContext";

export default function ModalWindow() {

  const {isActive, modalContent, closeModal} = useModal();
  
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <div className={styles.card}>{modalContent}</div>
      <div onClick={() => closeModal()} className={styles.overlay}></div>
    </div>
  )
}
