import styles from "/src/styles/modules/welcome.module.scss";
import WelcomeHeader from "../components/welcome/WelcomeHeader";
import Button from "../components/Button";
export default function welcome() {
  return (
    <div className={styles.container}>
      <WelcomeHeader />
      <div className={styles.hero}>
        <div className={styles.contents}>
          <div className={styles.heading}>Build the habits that matter!</div>
          <div className={styles.description}>
            Feeling overwhelmed? Our easy-to-use habit tracker helps you take
            control of your day and achieve your goals
          </div>
          <div className={styles.buttonContainer}>
            <Button type="primary" value="Get started" />
          </div>
        </div>
      </div>
    </div>
  );
}
