import {useSession} from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/pending-invites/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {faBuilding, faCirclePlus, faEnvelope, faGear, faRightFromBracket, faX, faCheck} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getUser, joinOrganization} from "@/api/api-calls";
import PendingInvite from "@/(components)/PendingInvite";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {router} from "next/client";
import Image from "next/image";
import chatFilterLogo from "../../../../public/logo-white.svg";
import Link from "next/link";

export default function PendingInvites() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState({ name: "", lastName: "" });
  const [pendingInvites, setPendingInvites] = useState({})

  useEffect(()=> {
    if (session && session.user !== null) {
      getUser(session.user.key, true).then((organization) => setPendingInvites(organization.pendingOrganizationInvites))
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
    {id: "organizations", name: "Organizations", url: "/panel/home", faIcon: faBuilding, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Pending Invites", url: "/panel/pending-invites", selected: true, faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "createOrganization", name: "Create Organization", url: "/panel/create-organization", faIcon: faCirclePlus, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "signOut", name: "Sign out", url: "/api/auth/signout", faIcon: faRightFromBracket, faColor: "#bb3131", faWidth: "20px"}
  ]

  const handleAccept = (organizationId) => {
    console.log(joinOrganization(session.user.key, organizationId))
    router.push("/panel/home")
  }

  const handleDeny = (organizationId) => {

  }

  return (
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
        <div className={styles.content_container}>
          <h2 className={styles.content_container_title}>Pending invites</h2>
          { Object.keys(pendingInvites).map((invite) => (
            <PendingInvite
              key={pendingInvites[invite].organizationId}
              name={pendingInvites[invite].organizationName}
              denyFaIcon={faX}
              denyFaColor={"#bb3131"}
              denyFaWidth={"17px"}
              denyFaClick={() => handleDeny(invite)}
              acceptFaIcon={faCheck}
              acceptFaColor={"#33c400"}
              acceptFaWidth={"22px"}
              acceptFaClick={() => handleAccept(invite)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}