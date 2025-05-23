import styles from "/src/styles/modules/welcome/form.module.scss";
import Button from "../Button";
import { useState, useEffect } from "react";
import PasswordField from "./PasswordField";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import FormLogin from "./FormLogin";

export default function FormRegister() {
  const { register } = useUser();
  const { closeModal, openModal } = useModal();

  interface RegisterData {
    name: string;
    email: string;
    password: string;
  }

  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const validateName = (name: string): boolean => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // check fields for errors
  useEffect(() => {
    const updatedErrors = new Map(errors);

    if (!registerData.name || !registerData.email || !registerData.password) {
      updatedErrors.set("fields", "Please fill all fields");
    } else {
      updatedErrors.delete("fields");
    }

    if (!validateName(registerData.name)) {
      updatedErrors.set("name", "Please provide a valid name");
    } else {
      updatedErrors.delete("name");
    }

    if (!validateEmail(registerData.email)) {
      updatedErrors.set("email", "Please provide a valid email address");
    } else {
      updatedErrors.delete("email");
    }

    if (!validatePassword(registerData.password)) {
      updatedErrors.set(
        "password",
        "Password must be at least 8 characters long and contain at least one letter and one number. Only English letters and numbers are allowed."
      );
    } else {
      updatedErrors.delete("password");
    }

    setErrors(updatedErrors);
  }, [registerData]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async () => {
    if (errors.size > 0) {
      setShowErrors(true);
      return;
    }
    closeModal();
    register(registerData);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create your account</h2>

      <form className={styles.form} action="" method="get">
        <h3 className={styles.label}>Name:</h3>
        <input
          name="name"
          onChange={handleChange}
          value={registerData.name}
          className={styles.input}
          type="text"
          placeholder="Enter name"
        />
        <h3 className={styles.label}>Email address:</h3>
        <input
          onChange={handleChange}
          value={registerData.email}
          name="email"
          className={styles.input}
          type="text"
          placeholder="Enter email address"
        />
        <h3 className={styles.label}>Password:</h3>
        <PasswordField
          value={registerData.password}
          onInput={(e) => {
            setRegisterData({
              ...registerData,
              password: (e.target as HTMLInputElement).value,
            });
          }}
        />
        <Button type="primary" value="Sign up" action={handleSubmit} />
      </form>
      {showErrors && (
        <>
          <div className={styles.errors}>
            {[...errors].map(([, error], index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        </>
      )}
      <div className={styles.footer}>
        <h4>Already have an account?</h4>
        <span
          className={styles.link}
          onClick={() => {
            closeModal();
            setTimeout(() => {
              openModal(<FormLogin />);
            }, 500);
          }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}
