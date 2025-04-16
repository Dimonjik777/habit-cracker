import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "/src/styles/modules/form.module.scss";

type FormLoginData = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const [data, setData] = useState<FormLoginData>({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (!data["email"] || !data["password"]) {
      setError("Please fill out empty fields.");
    } else {
      setError("");
    }
  }, [data]);
  const [error, setError] = useState<string>("");
  const handleSubmit = async () => {
    if (error) {
      return;
    }
    let result = await fetchLogin(data);
    console.log(`Login result: ${result}`);
  };

  const fetchLogin = async (data: FormLoginData): Promise<boolean> => {
    //Fetching mockup
    return new Promise((resolve) => {
      setTimeout(() => {
        console.table({ data });
        const success = !!Math.round(Math.random());
        resolve(success);
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create your account</h2>
      <form className={styles.form} action="" method="get">
        <h3 className={styles.label}>Email adress:</h3>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter email adress"
          onInput={(e) =>
            setData({ ...data, email: (e.target as HTMLInputElement).value })
          }
          required
        />
        <h3 className={styles.label}>Password:</h3>
        <input
          className={styles.input}
          type="password"
          placeholder="Enter password"
          onInput={(e) =>
            setData({ ...data, password: (e.target as HTMLInputElement).value })
          }
          required
        />
        <h4>{error}</h4>
        <Button type="primary" value="Sign up" action={handleSubmit} />
      </form>
    </div>
  );
}
