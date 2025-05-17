import styles from "/src/styles/modules/not-found.module.scss";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
}
