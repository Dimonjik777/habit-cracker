import styles from "/src/styles/modules/button.module.scss";
export default function Button({
  type,
  value,
}: {
  type: "primary" | "secondary";
  value: string;
}) {
  return (
    <input
      type="button"
      className={`${styles.button} ${
        type == "secondary" ? styles.secondary : ""
      }`}
      value={value}
    />
  );
}
