import styles from "@/styles/price/index.module.css"
import purpleBackground from "../../../public/purple-bg.jpg";
import Image from "next/image";
import chatFilterLogo from "../../../public/logo-white.svg";
import FooterSection from "../../../../chat-filter-web/src/(components)/FooterSection";
import PlanSection from "../../../../chat-filter-web/src/(components)/PlanSection";

export default function Price() {
  return (
    <main>
      <div
        style={{
          backgroundImage: `url(${purpleBackground.src})`,
          width: '100%',
          height: '100%',
          margin: '-1px 0 0 0',
        }}
      >
        <header className={styles.header}>
          <a href={"/"}>
            <Image
              className={styles.header_logo}
              src={ chatFilterLogo }
              alt={"Logo"}
            />
          </a>


          <ul className={styles.header_nav_bar}>
            <li>
              <a href={"/"}>Home</a>
            </li>
            <li>
              <a className={styles.selected} href={"/price/"}>Prices</a>
            </li>
            <li>
              <a href={"/panel/home"}>Client Area</a>
            </li>
          </ul>
        </header>

        <div className={styles.top_info}>
          <h1 className={styles.top_info_title}>
            Prices
          </h1>
          <p className={styles.top_info_text}>
            You do not know which plan is good for you? Contact us.
          </p>
        </div>
      </div>

      <div className={styles.main_container}>
        <div className={styles.plan_container}>
          <PlanSection
            name={"FREE"}
            description={"Get started with ChatFilter's FREE plan. Experience the power of our toxicity detection service at no cost."}
            price={"0 $"}
            perks={["1.000 daily checks", "Up to 3 organization members"]}
          />
          <PlanSection
            name={"PRO"}
            description={"Upgrade to ChatFilter's PRO plan for just $10.99. Take control of toxic content with enhanced features."}
            price={"10.99 $"}
            perks={["10.000 daily checks", "Up to 10 organization members"]}
          />
          <PlanSection
            name={"PREMIUM"}
            description={"Elevate your moderation efforts with ChatFilter's PREMIUM plan. Experience comprehensive toxicity detection and management with unlimited daily checks."}
            price={"29.99 $"}
            perks={["Unlimited daily checks", "Up to 50 organization members"]}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <footer className={styles.footer}>
          <FooterSection
            title={"Useful Links"}
            items={[{name: "Price", link: "/price/"}, {name: "Contact", link: "/contact/"}]}
          />

          <FooterSection
            title={"Control Panel"}
            items={[{name: "Login", link: "/auth/login/"}, {name: "Sign Up", link: "/auth/register/"}]}
          />

          <FooterSection
            title={"Legal"}
            items={[{name: "Privacy Policy", link: "/price/"}]}
          />
        </footer>
      </div>
    </main>
  )
}