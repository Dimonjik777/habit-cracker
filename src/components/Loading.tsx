import LoadingIcon from "/src/assets/loading.svg?react";
import styles from "/src/styles/modules/loading.module.scss";

export function Loading() {
  return (
    <div className={styles.container}>
      <LoadingIcon />
    </div>
  );
}
