import styles from "@/styles/components/PendingInvite.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PendingInvite({ name, acceptFaIcon, acceptFaColor, acceptFaWidth, acceptFaClick, denyFaIcon, denyFaColor, denyFaWidth, denyFaClick }) {
  return (
    <div className={styles.main_container}>
      <span className={styles.name}>{ name }</span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={denyFaIcon}
          color={denyFaColor}
          width={denyFaWidth}
          onClick={denyFaClick}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={acceptFaIcon}
          color={acceptFaColor}
          width={acceptFaWidth}
          onClick={acceptFaClick}
        />
      </div>
    </div>
  )
}