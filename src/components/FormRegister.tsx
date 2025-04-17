import styles from "/src/styles/modules/form.module.scss";
import Button from "./Button";
import { useState } from "react";
export default function FormRegister() {

  interface RegisterData {
    name: string;
    email: string;
    password: string;
  }

  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: ''
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create your account</h2>

      <form className={styles.form} action="" method="get">
        <h3 className={styles.label}>Name:</h3>
        <input name="name" onChange={
          handleChange
          }
          value={registerData.name}
          className={styles.input}
          type="text"
          placeholder="Enter name" />
        <h3 className={styles.label}>Email adress:</h3>
        <input
        onChange={(
          handleChange
        )}
        value={registerData.email}
        name="email"
        className={styles.input}
        type="text"
        placeholder="Enter email adress" />
        <h3 className={styles.label}>Password:</h3>
        <input
        onChange={handleChange}
        value={registerData.password}
        name="password"
        className={styles.input}
        type="password"
        placeholder="Enter password" />
        <Button type="primary" value="Sign up" action={() => console.log("Hello")} />
      </form>
    </div>
  )
}
