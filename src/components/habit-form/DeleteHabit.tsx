import HabitForm from "./HabitForm";
import styles from "/src/styles/modules/habit-form.module.scss";

export default function DeleteHabit({
  handleSubmit,
  habitTitle,
}: {
  handleSubmit: () => void;
  habitTitle: string;
}) {
  return (
    <div className={styles.deleteHabitContainer}>
      <HabitForm
        handleSubmit={handleSubmit}
        submitTitle="Delete habit"
        disabled={false}
        error=""
      >
        <h3>Are You sure you want to delete the "{habitTitle}"?</h3>
      </HabitForm>
    </div>
  );
}
