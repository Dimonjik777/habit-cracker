import { FormEventHandler, useState } from "react";
import EyeOpen from "/src/assets/eye-open.svg?react";
import EyeCrossed from "/src/assets/eye-crossed.svg?react";
import styles from "/src/styles/modules/welcome/password.module.scss";

export default function PasswordField({
  value,
  onInput,
}: {
  value: string;
  onInput: FormEventHandler<HTMLInputElement>;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type={`${isVisible ? "text" : "password"}`}
        onInput={onInput}
        value={value}
        placeholder="Enter password"
        name="password"
      />
      <div
        className={styles.iconContainer}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? <EyeCrossed /> : <EyeOpen />}
      </div>
    </div>
  );
}
