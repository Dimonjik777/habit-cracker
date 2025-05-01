import HabitForm from "./HabitForm";
import FormButton from "./FormButton";
import styles from "/src/styles/modules/habit-form.module.scss";
import { useModal } from "../../contexts/ModalContext";
export default function AddHabit() {
  const { closeModal } = useModal();
  return (
    <HabitForm>
      <div className={styles.submitContainer}>
        <div className={styles.buttonContainer}>
          <FormButton type="primary" value="Add habit" action={() => {}} />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton type="secondary" value="Cancel" action={closeModal} />
        </div>
      </div>
    </HabitForm>
  );
}
