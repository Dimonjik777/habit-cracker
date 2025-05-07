import { useModal } from "../../contexts/ModalContext";
import FormButton from "./FormButton";
import styles from "/src/styles/modules/habit-form.module.scss";

export default function HabitForm({
  children,
  handleSubmit,
  disabled,
  submitTitle,
}: {
  children: React.ReactNode;
  handleSubmit: () => void;
  disabled: boolean;
  submitTitle: string;
}) {
  const { closeModal } = useModal();
  return (
    <form className={styles.container}>
      <div className={styles.content}>{children}</div>
      <div className={styles.submitContainer}>
        <div className={styles.buttonContainer}>
          <FormButton
            type="primary"
            value={submitTitle}
            disabled={disabled}
            action={handleSubmit}
          />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton type="secondary" value="Cancel" action={closeModal} />
        </div>
      </div>
    </form>
  );
}
