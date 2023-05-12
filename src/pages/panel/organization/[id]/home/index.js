import { useSession } from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/organization/home/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {faChartSimple, faEnvelope, faUsers, faGear, faRightFromBracket, faTrash} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import chatFilterLogo from "../../../../../../public/logo-white.svg";
import Link from "next/link";

export default function OrganizationHomePanel(params) {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  if (!session || session.user === null) {
    return(
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  /*
  * Statistics
  * Invites (invite member, delete invite)
  * Members
  * Settings (update name)
  * Leave
  * Delete
   */

  const sidebarOptions = [
    {id: "statistics", name: "Statistics", url: "/panel/organization/" + id + "/home", selected: true, faIcon: faChartSimple, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Invites", url: "/panel/organization/" + id + "/invites", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "members", name: "Members", url: "/panel/organization/" + id + "/members", faIcon: faUsers, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/organization/" + id + "/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "leave", name: "Leave", url: "/panel/organization/" + id + "/members", faIcon: faRightFromBracket, faColor: "#ffffff", faWidth: "20px"},
    {id: "delete", name: "Delete", url: "/panel/organization/" + id + "/leave", faIcon: faTrash, faColor: "#bb3131", faWidth: "20px"},
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
          title={"Options"}
          items={sidebarOptions}
        />
      </div>
    </div>
  )
}