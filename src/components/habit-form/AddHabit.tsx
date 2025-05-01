import HabitForm from "./HabitForm";
import FormButton from "./FormButton";
import styles from "/src/styles/modules/habit-form.module.scss";

export default function AddHabit() {
  return (
    <HabitForm>
      <div className={styles.submitContainer}>
        <div className={styles.buttonContainer}>
          <FormButton type="primary" value="Add habit" action={() => {}} />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton type="secondary" value="Cancel" action={() => {}} />
        </div>
      </div>
    </HabitForm>
  );
}
