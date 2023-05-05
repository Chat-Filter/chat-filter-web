import styles from "@/styles/components/SidebarPanel.module.css"
import { useRouter } from 'next/router'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link"
import { signOut } from "next-auth/react";

export default function SidebarPanel({ title, items }) {
  const router = useRouter()

  const handleClick = (event, url) => {
    console.log(url)
    if (url === "/api/auth/signout") {
      signOut()
    }

    router.push(url)
  }

  return (
    <div className={styles.panel_container}>
      <span className={styles.title}>{title}</span>
      <ul className={styles.list}>
        {items.map((option) => (
            <li
              key={option.id}
              className={option.selected ? `${styles.list_option} ${styles.selected_option}` : styles.list_option}
              onClick={(event) => handleClick(event, option.url)}
            >
              <Link className={styles.option_link} href={option.url}>
                <FontAwesomeIcon
                  className={styles.option_icon}
                  icon={option.faIcon}
                  color={option.faColor}
                  width={option.faWidth}
                />
                <span className={styles.option_name}>{option.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}