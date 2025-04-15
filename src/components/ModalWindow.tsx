import { ReactNode } from "react";
import styles from "/src/styles/modules/modal-window.module.scss";

export default function ModalWindow(
  {children} : {children: ReactNode}
) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>{children}</div>
      <div className={styles.overlay}></div>
    </div>
  )
}
