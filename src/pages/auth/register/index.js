import styles from "@/styles/auth/register/index.module.css"
import chatFilterLogo from "../../../../public/logo.svg";
import Image from "next/image";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function Register() {
  const [userInfo, setUserInfo] = useState({ name: "", lastName: "", email: "", password: "", confirmPassword: ""});
  const [errorInfo, setErrorInfo] = useState( { name: false, lastName: false, email: false, password: false, confirmPassword: false });
  const handleSubmit = async (e) => {
    e.preventDefault();

    var errors = errorInfo

    errors.name = userInfo.name === "";
    errors.lastName = (userInfo.lastName === "");
    errors.email = userInfo.email === "";
    errors.password = userInfo.password === "";
    errors.confirmPassword = userInfo.confirmPassword === "";
    errors.confirmPassword = userInfo.password !== userInfo.confirmPassword;

    if (Object.values(errors).indexOf(true) > -1) {
      return
    }

    const payload = {
      email: userInfo.email,
      password: userInfo.password,
      name: userInfo.name,
      lastName: userInfo.lastName
    };

    const registerResponse = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const key = await registerResponse.json()
      const loginResponse = await signIn('credentials', {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: "/panel/home",
        redirect: true
      });
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className={styles.main}>
      <Image
        className={styles.register_image}
        src={chatFilterLogo}
        alt={"ChatFilter logo"}
        height={100}
        width={100}
      />

      <div className={styles.register_container}>
        <h1 className={styles.register_title}>Register</h1>
        <span className={styles.register_description}>Register you account.</span>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={errorInfo.name ? `${styles.input} ${styles.error}` : styles.input}
            type={"text"} name={"name"}
            placeholder={"Name"}
            onChange={({ target}) => setUserInfo({ ...userInfo, name: target.value })}
          />
          <input
            className={errorInfo.lastName ? `${styles.input} ${styles.error}` : styles.input}
            type={"text"} name={"lastName"}
            placeholder={"Last name"}
            onChange={({ target}) => setUserInfo({ ...userInfo, lastName: target.value })}
          />
          <input
            className={errorInfo.email ? `${styles.input} ${styles.error}` : styles.input}
            type={"text"}
            name={"email"}
            placeholder={"Email"}
            onChange={({ target}) => setUserInfo({ ...userInfo, email: target.value })}
          />
          <input
            className={errorInfo.password ? `${styles.input} ${styles.error}` : styles.input}
            type={"password"} name={"password"}
            placeholder={"Password"}
            onChange={({ target}) => setUserInfo({ ...userInfo, password: target.value })}
          />
          <input
            className={errorInfo.confirmPassword ? `${styles.input} ${styles.error}` : styles.input}
            type={"password"}
            name={"password"}
            placeholder={"Confirm password"}
            onChange={({ target}) => setUserInfo({ ...userInfo, confirmPassword: target.value })}
          />
          <button style={{cursor: 'pointer'}} className={styles.register_button}>Sign Up</button>
        </form>

        <span className={styles.register_login_text}>Already registered? <a href={"/auth/login/"}>Login.</a></span>
      </div>
    </main>
  )
}