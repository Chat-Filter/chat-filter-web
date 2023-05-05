import styles from "@/styles/auth/login/index.module.css"
import chatFilterLogo from "../../../../public/logo.svg";
import Image from "next/image";
import { useSession, signIn } from 'next-auth/react';
import { useState } from "react";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: ''});
  const [errorInfo, setErrorInfo] = useState( { name: false, lastName: false, email: false, password: false, confirmPassword: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    var errors = errorInfo

    errors.email = userInfo.email === "";
    errors.password = userInfo.password === "";

    if (Object.values(errors).indexOf(true) > -1) {
      return
    }

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: "/panel/home",
      redirect: true
    });
  }

  return (
    <main className={styles.main}>
      <Image
        className={styles.login_image}
        src={chatFilterLogo}
        alt={"ChatFilter logo"}
        height={100}
        width={100}
      />

      <div className={styles.login_container}>
        <h1 className={styles.login_title}>Login</h1>
        <span className={styles.login_description}>Login to your account.</span>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} value={userInfo.email} onChange={({ target}) => setUserInfo({ ...userInfo, email: target.value })} type={"text"} name={"email"} placeholder={"Email"}/>
          <input className={[styles.login_password, styles.input].join(" ")} onChange={({ target}) => setUserInfo({ ...userInfo, password: target.value })} value={userInfo.password} type={"password"} name={"password"} placeholder={"Password"}/>
          <button style={{cursor: 'pointer'}} className={styles.login_button}>Login</button>
        </form>

        <span className={styles.login_register_text}>Not registered? <a href={"/auth/register/"}>Sign Up.</a></span>
      </div>
    </main>
  )
}