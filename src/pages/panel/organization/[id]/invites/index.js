import {useSession} from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/organization/invites/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {
  faChartSimple,
  faEnvelope,
  faGear,
  faRightFromBracket,
  faTrash,
  faUsers,
  faX
} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Invite from "@/(components)/Invite";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {createInvite, getOrganization, deleteInvite} from "@/api/api-calls";
import Image from "next/image";
import chatFilterLogo from "../../../../../../public/logo-white.svg";
import Link from "next/link";

export default function OrganizationInvites(params) {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [organization, setOrganization] = useState({});
  const [inviteEmail, setInviteEmail] = useState("")

  useEffect(()=> {
    if (session && session.user !== null) {
      getOrganization(session.user.key, id).then((organization) => setOrganization(organization))
    }
  }, [session, id])

  if (!session || session.user === null) {
    return (
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  const sidebarOptions = [
    {id: "statistics", name: "Statistics", url: "/panel/organization/" + id + "/home", faIcon: faChartSimple, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Invites", url: "/panel/organization/" + id + "/invites", selected: true, faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "members", name: "Members", url: "/panel/organization/" + id + "/members", faIcon: faUsers, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/organization/" + id + "/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "leave", name: "Leave", url: "/panel/organization/" + id + "/leave", faIcon: faRightFromBracket, faColor: "#ffffff", faWidth: "20px"},
    {id: "delete", name: "Delete", url: "/panel/organization/" + id + "/delete", faIcon: faTrash, faColor: "#bb3131", faWidth: "20px"},
  ]

  const handleInvite = (e) => {
    e.preventDefault()
    console.log(createInvite(session.user.key, id, inviteEmail))
    window.location.reload()
  }

  const handleDelete = (email) => {
    console.log(deleteInvite(session.user.key, id, email))
    window.location.reload()
  }

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
        <div className={styles.content_container}>
          <h2 className={styles.content_container_title}>Create invite</h2>
          <input
            placeholder={"Email"}
            className={styles.input}
            onChange={e => setInviteEmail(e.target.value)}
          />
          <button
            style={{cursor: 'pointer'}}
            className={styles.button}
            onClick={handleInvite}
          >Send invite</button>
        </div>

        <div className={styles.content_container}>
          <h2 className={styles.content_container_title}>Pending invites</h2>
          { organization.hasOwnProperty("pendingInvites") ? Object.keys(organization.pendingInvites).map((invite) => (
            <Invite
              key={invite}
              name={invite}
              faIcon={faX}
              faColor={"#bb3131"}
              faWidth={"17px"}
              onFaIconClick={() => handleDelete(invite)}
            />
          )) : console.log("Loading invites...") }
        </div>
      </div>
    </div>
  )
}