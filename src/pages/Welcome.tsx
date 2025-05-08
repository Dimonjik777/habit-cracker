import styles from "/src/styles/modules/welcome/welcome.module.scss";
import WelcomeHeader from "../components/welcome/WelcomeHeader";
import Button from "../components/Button";
import { useModal } from "../contexts/ModalContext";
import FormRegister from "../components/welcome/FormRegister";
export default function welcome() {
  const { openModal } = useModal();

  return (
    <>
      <div className={styles.container}>
        <WelcomeHeader />
        <div className={styles.hero}>
          <div className={styles.contents}>
            <h1 className={styles.heading}>Build the habits that matter!</h1>
            <h3 className={styles.description}>
              Feeling overwhelmed? Our easy-to-use habit tracker helps you take
              control of your day and achieve your goals
            </h3>
            <div className={styles.buttonContainer}>
              <Button
                type="primary"
                value="Get started"
                action={() => openModal(<FormRegister />)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
