import styles from "/src/styles/modules/form-button.module.scss";
export default function FormButton({
  type,
  value,
  action,
  disabled,
}: {
  type: "primary" | "secondary";
  value: string;
  action: () => void;
  disabled?: boolean;
}) {
  return (
    <input
      type="button"
      className={`
      ${styles.button} 
      ${type == "secondary" ? styles.secondary : ""} 
      ${disabled ? styles.disabled : ""}
      `}
      value={value}
      onClick={action}
    />
  );
}
