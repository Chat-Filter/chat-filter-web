import styles from "@/styles/components/Invite.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Invite({ name, faIcon, faColor, faWidth, onFaIconClick }) {
  return (
    <div className={styles.main_container}>
      <span className={styles.name}>{ name }</span>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faIcon}
        color={faColor}
        width={faWidth}
        onClick={onFaIconClick}
      />
    </div>
  )
}