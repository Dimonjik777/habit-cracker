import Logo from "/src/assets/logo.svg?react";
import Button from "../Button";
import styles from "/src/styles/modules/welcome-header.module.scss";
import { useModal } from "../../contexts/ModalContext";
import FormRegister from "../FormRegister";
import FormLogin from "../FormLogin";

export default function WelcomeHeader() {

  const {openModal} = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Logo />
        <h1>Habit Cracker</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.buttonContainer}>
          <Button type="primary" value="Sign In" action={() => {
            openModal(<FormLogin />);
          }} />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="secondary" value="Sign Up" action={() => {
            openModal(<FormRegister />)
          }} />
        </div>
      </div>
    </div>
  );
}
