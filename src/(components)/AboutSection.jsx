import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/AboutSection.module.css";

export default function AboutSection({ faIcon, faColor, faWidth, title, text }) {
  return (
    <div className={styles.about_section_container}>
      <FontAwesomeIcon
        className={styles.about_section_icon}
        icon={faIcon}
        color={faColor}
        width={faWidth}
      />
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}