import styles from "/src/styles/modules/add-button.module.scss";

export default function AddButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>+</div>
    </div>
  );
}
