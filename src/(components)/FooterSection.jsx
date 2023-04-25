import styles from "../styles/components/FooterSection.module.css";


export default function FooterSection({ title, items }) {
  return (
    <div className={styles.footer_section_container}>
      <span className={styles.footer_section_title}>{title}</span>
      <ul className={styles.footer_section_list}>
        {items.map((item) => (
          <li key={item.name} className={styles.footer_section_list_item}><a href={item.link}>{item.name}</a></li>
        ))}
      </ul>
    </div>
  )
}