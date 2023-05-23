import { useSession } from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/organization/settings/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {
  faBuilding,
  faChartSimple,
  faCirclePlus,
  faEnvelope,
  faGear,
  faRightFromBracket, faTrash, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Image from "next/image";
import chatFilterLogo from "../../../../../../public/logo-white.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import {getOrganization, updateName} from "@/api/api-calls";

export default function CreateOrganization() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [organization, setOrganization] = useState({});
  const [organizationName, setOrganizationName] = useState("");

  useEffect(()=> {
    if (session && session.user !== null) {
      getOrganization(session.user.key, id).then((organization) => setOrganization(organization))
    }
  }, [session, id])

  if (!session || session.user === null) {
    return(
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(updateName(session.user.key, id, organizationName))
    window.location.reload()
  }

  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(organization.key.key);
  }

  const sidebarOptions = [
    {id: "statistics", name: "Statistics", url: "/panel/organization/" + id + "/home", faIcon: faChartSimple, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Invites", url: "/panel/organization/" + id + "/invites", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "members", name: "Members", url: "/panel/organization/" + id + "/members", faIcon: faUsers, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/organization/" + id + "/settings", selected: true, faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "leave", name: "Leave", url: "/panel/organization/" + id + "/leave", faIcon: faRightFromBracket, faColor: "#ffffff", faWidth: "20px"},
    {id: "delete", name: "Delete", url: "/panel/organization/" + id + "/delete", faIcon: faTrash, faColor: "#bb3131", faWidth: "20px"},
  ]

  return (
    <div className={styles.main_container}>
      <Link href={"/panel/home"} className={styles.logo_link}>
        <Image
          className={styles.logo}
          src={ chatFilterLogo }
          alt={"Logo"}
        />
      </Link>
      <div className={styles.sidebar}>
        <SidebarPanel
          title={"Organization Options"}
          items={sidebarOptions}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.welcome_title}>{ organization.name }&apos;s organization</h1>
        <div className={styles.settings_container}>
          <h2 className={styles.settings_title}>Organization settings</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              placeholder={"Organization name"}
              className={styles.organization_name_input}
              onChange={({ target}) => setOrganizationName(target.value)}
            />
            <button style={{cursor: 'pointer'}} className={styles.submit_button}>Update</button>
          </form>
        </div>
        <div className={styles.settings_container}>
          <h2 className={styles.settings_title}>API key</h2>
          <form className={styles.form} onSubmit={handleCopy}>
            <div className={styles.key_container}>
              <span className={styles.key_text}>{
                organization.hasOwnProperty("key") ? organization.key.key : "Loading..."
              }</span>
            </div>
            <button style={{cursor: 'pointer'}} className={styles.submit_button}>Copy</button>
          </form>
        </div>
      </div>
    </div>
  )
}