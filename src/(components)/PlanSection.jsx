import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/components/PlanSection.module.css";

export default function PlanSection({ name, price, description, perks }) {
  return (
    <div className={styles.plan_section_container}>
      <div className={styles.plan_section_info_container}>
        <span className={styles.plan_section_name}>{name}</span>
        <span className={styles.plan_section_price}>{price}</span>
        <span className={styles.plan_section_description}>{description}</span>
      </div>
      <div className={styles.plan_section_perks_container}>
        <ul className={styles.plan_section_list}>
          {perks.map((perk) => (
            <li key={perk} className={styles.plan_section_list_item}>
              <FontAwesomeIcon
                className={styles.plan_section_list_item_icon}
                icon={faCheck}
                color={"#33c400"}
                width={"20px"}
              />
              <span className={styles.plan_section_list_item_text}>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}