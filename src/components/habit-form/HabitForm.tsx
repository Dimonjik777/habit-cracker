import styles from "/src/styles/modules/habit-form.module.scss";

export default function HabitForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.content}>{children}</div>
    </form>
  );
}
