import styles from "/src/styles/modules/form.module.scss";
import Button from "./Button";
export default function FormRegister() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create your account</h2>

      <form className={styles.form} action="" method="get">
        <h3 className={styles.label}>Name:</h3>
        <input className={styles.input} type="text" placeholder="Enter name" />
        <h3 className={styles.label}>Email adress:</h3>
        <input className={styles.input} type="text" placeholder="Enter email adress" />
        <h3 className={styles.label}>Password:</h3>
        <input className={styles.input} type="password" placeholder="Enter password" />
        <Button type="primary" value="Sign up" action={() => console.log("Hello")} />
      </form>
    </div>
  )
}
