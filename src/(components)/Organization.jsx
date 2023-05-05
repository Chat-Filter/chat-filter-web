import styles from "@/styles/components/Organization.module.css"
import Link from "next/link";
import Image from "next/image";
import organizationIcon from "../../public/OrganizationIcon.svg";


export default function Organization({ id, name, remainingChecks, totalChecks }) {
  return (
    <div className={styles.organization_container}>
      <Link href={"/panel/organization/" + id + "/home"} className={styles.organization_link}>
        <Image
          className={styles.organization_icon}
          src={ organizationIcon }
          alt={"Organization icon"}
        />

        <span className={styles.organization_name}>{name}</span>
      </Link>

      <span className={styles.organization_checks}>{"Checks: " + remainingChecks + "/" + totalChecks}</span>
    </div>
  )
}