import { useEffect, useState } from "react";
import Button from "../Button";
import PasswordField from "./PasswordField";
import styles from "/src/styles/modules/welcome/form.module.scss";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";

type FormLoginData = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const [data, setData] = useState<FormLoginData>({
    email: "",
    password: "",
  });

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (!data["email"] || !data["password"]) {
      setError("Please fill out empty fields.");
    } else if (!validateEmail(data["email"])) {
      setError("Please follow the email pattern");
    } else {
      setError("");
    }
    setShowError(false);
  }, [data]);

  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const { login } = useUser();
  const { closeModal } = useModal();

  const handleSubmit = async () => {
    if (error) {
      setShowError(true);
      return;
    }

    let result = await fetchLogin(data);

    if (result) {
      login(data);
      closeModal();
    }
  };

  const fetchLogin = async (data: FormLoginData): Promise<boolean> => {
    //Fetching users data

    return new Promise((resolve) => {
      const allUsers = JSON.parse(localStorage.getItem("Users") || "");
      const user = allUsers[data.email];
      if (user && user.password === data.password) {
        resolve(true);
      } else {
        setError("Incorrect email or password entered.");
        setShowError(true);
        resolve(false);
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login to Habit Cracker</h2>
      <form className={styles.form} action="" method="get">
        <h3 className={styles.label}>Email adress:</h3>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Enter email adress"
          onInput={(e) =>
            setData({ ...data, email: (e.target as HTMLInputElement).value })
          }
          required
        />
        <h3 className={styles.label}>Password:</h3>
        <PasswordField
          onInput={(e) =>
            setData({ ...data, password: (e.target as HTMLInputElement).value })
          }
          value={data.password}
        />

        <Button type="primary" value="Sign in" action={handleSubmit} />
      </form>
      {showError && <p className={styles.error}>{error}</p>}
    </div>
  );
}
