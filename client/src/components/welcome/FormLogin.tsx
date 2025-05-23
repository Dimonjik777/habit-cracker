import { useEffect, useState } from "react";
import Button from "../Button";
import PasswordField from "./PasswordField";
import styles from "/src/styles/modules/welcome/form.module.scss";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import FormRegister from "./FormRegister";

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
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const updatedErrors = new Map(errors);

    if (!data.email || !data.password) {
      updatedErrors.set("fields", "Please fill all fields");
    } else {
      updatedErrors.delete("fields");
    }

    if (!validateEmail(data.email)) {
      updatedErrors.set("email", "Please provide a valid email address");
    } else {
      updatedErrors.delete("email");
    }

    if (!validatePassword(data.password)) {
      updatedErrors.set(
        "password",
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else {
      updatedErrors.delete("password");
    }

    setErrors(updatedErrors);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const { login } = useUser();
  const { closeModal, openModal } = useModal();

  const handleSubmit = async () => {
    if (errors && errors.size > 0) {
      console.log(errors);
      setShowErrors(true);
      return;
    }

    const result = await fetchLogin(data);

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
        setErrors((prev) => {
          const updated = new Map(prev);
          updated.set("login", "Invalid email or password");
          return updated;
        });
        setShowErrors(true);

        setShowErrors(true);
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
      {showErrors && (
        <>
          {[...errors].map(([, error], index) => (
            <p key={index} className={styles.error}>
              {error}
            </p>
          ))}
        </>
      )}
      <div className={styles.footer}>
        <h4>Do not have an account yet?</h4>
        <span
          className={styles.link}
          onClick={() => {
            closeModal();
            setTimeout(() => {
              openModal(<FormRegister />);
            }, 500);
          }}
        >
          Sign up
        </span>
      </div>
    </div>
  );
}
