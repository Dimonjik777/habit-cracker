import styles from "/src/styles/modules/form.module.scss";
import Button from "./Button";
import { useState } from "react";
import PasswordField from "./PasswordField";
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

  const [emailError, setEmailError] = useState<string | null>(null);

  function validateEmail(email : string) : boolean {
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;

    if(name == "email")
      setEmailError(null);

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
        <PasswordField 
        value={registerData.password}
        onInput={(e) => {
          setRegisterData({...registerData, password:(e.target as HTMLInputElement).value})
        }} />
        <Button type="primary" value="Sign up" action={() => {
          if(!validateEmail(registerData.email)){
            setEmailError("Incorrect email");
            return;
          }
        }} />
      </form>
      {emailError ? <p className={styles.error}>{emailError}</p> : ''}
    </div>
  )
}
