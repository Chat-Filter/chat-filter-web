import { useSession, signOut } from "next-auth/react"
import styles from "@/styles/panel/home/index.module.css"
import ErrorComponent from "@/(components)/ErrorComponent";
import SidebarPanel from "@/(components)/SidebarPanel.jsx";
import { faBuilding, faEnvelope, faCirclePlus, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Organization from "@/(components)/Organization";
import { useState, useEffect } from "react";
import {getOrganizations} from "@/api/api-calls";
import Image from "next/image";
import chatFilterLogo from "../../../../public/logo-white.svg";
import Link from "next/link";

export default function PanelHome() {
  const { data: session } = useSession()
  const [organizations, setOrganizations] = useState([]);

  useEffect(()=> {
    if (session && session.user !== null) {
      getOrganizations(session.user.key).then((organizations) => setOrganizations(organizations))
    }
  }, [session])

  if (!session || session.user === null) {
    return(
        <ErrorComponent
          error={"Not signed in"}
        />
      )
  }

  const sidebarOptions = [
    {id: "organizations", name: "Organizations", url: "/panel/home", selected: true, faIcon: faBuilding, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Pending Invites", url: "/panel/pending-invites", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "createOrganization", name: "Create Organization", url: "/panel/create-organization", faIcon: faCirclePlus, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "signOut", name: "Sign out", url: "/api/auth/signout", faIcon: faRightFromBracket, faColor: "#bb3131", faWidth: "20px"}
  ]

  return <>
    <div className={styles.main_container}>
      <Link href={"/"} className={styles.logo_link}>
        <Image
          className={styles.logo}
          src={ chatFilterLogo }
          alt={"Logo"}
        />
      </Link>
      <div className={styles.sidebar}>
        <SidebarPanel
          title={"Options"}
          items={sidebarOptions}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.welcome_title}>Welcome, { session.user.name }</h1>


        <div className={styles.organizations_container}>
          <h2 className={styles.organizations_title}>Organizations</h2>
          <div className={styles.organizations_list_container}>
            {organizations.map((organization) => (
              <Organization
                key={organization.id}
                id={organization.id}
                name={organization.name}
                remainingChecks={"100"}
                totalChecks={"1000"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
}