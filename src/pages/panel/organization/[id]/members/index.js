import {useSession} from "next-auth/react"
import ErrorComponent from "@/(components)/ErrorComponent";
import styles from "@/styles/panel/organization/members/index.module.css";
import SidebarPanel from "@/(components)/SidebarPanel";
import {
  faChartSimple,
  faEnvelope,
  faGear,
  faRightFromBracket,
  faTrash,
  faUser,
  faUsers,
  faX
} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getOrganization, getMembersData, kickMember} from "@/api/api-calls";
import OrganizationMember from "@/(components)/OrganizationMember";
import Image from "next/image";
import chatFilterLogo from "../../../../../../public/logo-white.svg";
import Link from "next/link";

export default function OrganizationInvites(params) {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [organization, setOrganization] = useState({});
  const [membersData, setMembersData] = useState([])

  useEffect(()=> {
    if (session && session.user !== null) {
      getOrganization(session.user.key, id).then((organization) => setOrganization(organization))
    }
  }, [session, id])

  useEffect(() => {
    if (organization.hasOwnProperty("name")) {
      getMembersData(session.user.key, organization.id, Object.keys(organization.members)).then((data) => setMembersData(data))
    }
  }, [session, organization])

  if (!session || session.user === null) {
    return (
      <ErrorComponent
        error={"Not signed in"}
      />
    )
  }

  const sidebarOptions = [
    {id: "statistics", name: "Statistics", url: "/panel/organization/" + id + "/home", faIcon: faChartSimple, faColor: "#ffffff", faWidth: "20px"},
    {id: "pendingInvites", name: "Invites", url: "/panel/organization/" + id + "/invites", faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
    {id: "members", name: "Members", url: "/panel/organization/" + id + "/members", selected: true, faIcon: faUsers, faColor: "#ffffff", faWidth: "20px"},
    {id: "settings", name: "Settings", url: "/panel/organization/" + id + "/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
    {id: "leave", name: "Leave", url: "/panel/organization/" + id + "/members", faIcon: faRightFromBracket, faColor: "#ffffff", faWidth: "20px"},
    {id: "delete", name: "Delete", url: "/panel/organization/" + id + "/leave", faIcon: faTrash, faColor: "#bb3131", faWidth: "20px"},
  ]

  const handleKick = (userId) => {
    kickMember(session.user.key, id, userId)
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
          title={"Options"}
          items={sidebarOptions}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.welcome_title}>{ organization.name }&apos;s organization</h1>
        <div className={styles.content_container}>
          <h2 className={styles.content_container_title}>Members</h2>
          <div className={styles.members_container}>
            {  membersData.map((memberData) => (
              <OrganizationMember
                key={memberData.id}
                name={memberData.name + " " + memberData.lastName}
                role={memberData.role.charAt(0).toUpperCase() + memberData.role.substring(1) }
                faIcon={faUser}
                faWidth={"100px"}
                faColor={"#ffffff"}
                faKickIcon={faX}
                faKickColor={"#bb3131"}
                faKickWidth={"17px"}
                faKickHandler={() => handleKick(memberData.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}