import styles from "@/styles/components/ErrorComponent.module.css"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'

export default function ErrorComponent({ error }) {
  const router = useRouter()

  const handleRegister = (e) => {
    router.push("/auth/register")
  }

  return (
    <div className={styles.error_container}>
      <h1 className={styles.error_title}>{error}</h1>
      <div className={styles.error_buttons_container}>
        <button className={styles.button} onClick={() => signIn()}>Sign in</button>
        <button className={styles.button} onClick={handleRegister}>Sign Up</button>
      </div>
    </div>
  )
}