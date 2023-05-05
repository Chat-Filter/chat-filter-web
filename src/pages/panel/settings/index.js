import { useSession } from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/settings/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {faBuilding, faCirclePlus, faEnvelope, faGear, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from 'next/router'

async function updateUser(key, user) {
  const url = "http://localhost:8080/api/user/update"

  const payload = {
    key: key,
    userDTO: user
  }

  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const json = await request.json()
    console.log(json)
  } catch (e) {
    console.log("Can't update user" + e)
  }
}

export default function Settings() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState({ name: "", lastName: "" });
  const router = useRouter()

  if (!session || session.user === null) {
    return(
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  const sidebarOptions = [
    {id: "organizations", name: "Organizations", url: "/panel/home", faIcon: faBuilding, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Pending Invites", url: "/", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "createOrganization", name: "Create Organization", url: "/panel/create-organization", faIcon: faCirclePlus, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", selected: true, url: "/panel/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "signOut", name: "Sign out", url: "/api/auth/signout", faIcon: faRightFromBracket, faColor: "#bb3131", faWidth: "20px"}
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    session.user.name = userData.name
    session.user.lastName = userData.lastName
    updateUser(session.user.key, session.user)
    router.push("/panel/home")
  }

  return (
    <div className={styles.main_container}>

      <div className={styles.sidebar}>
        <SidebarPanel
          title={"Options"}
          items={sidebarOptions}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.welcome_title}>Welcome, { session.user.name }</h1>
        <div className={styles.create_organization_container}>
          <h2 className={styles.create_organization_title}>Settings</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              placeholder={"Name"}
              className={styles.organization_name_input}
              onChange={({ target}) => setUserData({ ...userData, name: target.value })}
            />
            <input
              placeholder={"Last name"}
              className={styles.organization_name_input}
              onChange={({ target}) => setUserData({ ...userData, lastName: target.value })}
            />
            <button style={{cursor: 'pointer'}} className={styles.submit_button}>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}