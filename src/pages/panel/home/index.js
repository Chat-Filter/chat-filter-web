import { useSession, signIn, signOut } from "next-auth/react"
import styles from "@/styles/panel/home/index.module.css"
import ErrorComponent from "@/(components)/ErrorComponent";

export default function PanelHome() {
  const { data: session } = useSession()

  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return <>
    <ErrorComponent
      error={"Not signed in"}
    />
  </>
}