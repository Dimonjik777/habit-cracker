import styles from "/src/styles/modules/button.module.scss";
export default function Button({
  type,
  value,
  action,
}: {
  type: "primary" | "secondary";
  value: string;
  action: () => void;
}) {
  return (
    <input
      type="button"
      className={`${styles.button} ${
        type == "secondary" ? styles.secondary : ""
      }`}
      value={value}
      onClick={action}
    />
  );
}
