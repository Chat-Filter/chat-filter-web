import { useSession } from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/create-organization/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {faBuilding, faCirclePlus, faEnvelope, faGear, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from 'next/router'

async function createOrganization(userKey, organizationName) {
  const url = "http://localhost:8080/api/organization/create"

  const payload = {
    key: userKey,
    name: organizationName
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const json = await response.json()
  } catch (e) {
    console.log("Can't create organization" + e)
  }
}

export default function CreateOrganization() {
  const { data: session } = useSession()
  const [organizationName, setOrganizationName] = useState({ name: "" });
  const router = useRouter()

  if (!session || session.user === null) {
    return(
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createOrganization(session.user.key, organizationName.name)
    router.push("/panel/home")
  }

  const sidebarOptions = [
    {id: "organizations", name: "Organizations", url: "/panel/home", faIcon: faBuilding, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Pending Invites", url: "/", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "createOrganization", name: "Create Organization", selected: true, url: "/panel/create-organization", faIcon: faCirclePlus, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "signOut", name: "Sign out", url: "/api/auth/signout", faIcon: faRightFromBracket, faColor: "#bb3131", faWidth: "20px"}
  ]

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
            <h2 className={styles.create_organization_title}>Create organization</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                placeholder={"Organization name"}
                className={styles.organization_name_input}
                onChange={({ target}) => setOrganizationName({ ...organizationName, name: target.value })}
              />
              <button style={{cursor: 'pointer'}} className={styles.submit_button}>Create organization</button>
            </form>
          </div>
        </div>
      </div>
    )
}