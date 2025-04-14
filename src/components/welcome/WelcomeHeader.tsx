import Logo from "/src/assets/logo.svg?react";
import Button from "../Button";
import styles from "/src/styles/modules/welcome-header.module.scss";
export default function WelcomeHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Logo />
        <div className={styles.logoText}>Habit Cracker</div>
      </div>
      <div className={styles.right}>
        <div className={styles.buttonContainer}>
          <Button type="primary" value="Sign In" />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="secondary" value="Sign Up" />
        </div>
      </div>
    </div>
  );
}
