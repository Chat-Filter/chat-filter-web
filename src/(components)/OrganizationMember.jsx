import styles from "@/styles/components/OrganizationMember.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrganizationMember({ name, role, faIcon, faColor, faWidth, faKickIcon, faKickColor, faKickWidth, faKickHandler }) {
  return (
    <div className={styles.main_container}>
      <div className={styles.icons_container}>
        <FontAwesomeIcon
          className={styles.kick_icon}
          icon={faKickIcon}
          color={faKickColor}
          width={faKickWidth}
          onClick={faKickHandler}
        />
        <FontAwesomeIcon
          className={styles.user_icon}
          icon={faIcon}
          color={faColor}
          width={faWidth}
        />
      </div>


      <span className={styles.name}>{name}</span>
      <span className={styles.role}>{role}</span>
    </div>
  )
}