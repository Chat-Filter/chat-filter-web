import styles from "@/styles/index.module.css"
import chatFilterLogo from "../../public/logo-white.svg"
import purpleBackground from '../../public/purple-bg.jpg'
import Image from 'next/image'
import AboutSection from "../../../chat-filter-web/src/(components)/AboutSection";
import FooterSection from "../../../chat-filter-web/src/(components)/FooterSection";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
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
                <a href={"/"} className={styles.selected}>Home</a>
              </li>
              <li>
                <a href={"/price"}>Prices</a>
              </li>
              <li>
                <a href={"/panel/home"}>Client Area</a>
              </li>
            </ul>
          </header>

          <div className={styles.top_info}>
            <h1 className={styles.top_info_title}>
              Highly available chat protection platform
            </h1>
            <p className={styles.top_info_text}>
              Trusted by 50,000+ Minecraft networks since 2015. Stay online no matter what threats face you. The ideal solution for gaming networks that demand low latency and 100% uptime.
            </p>
          </div>
        </div>

        <div className={styles.main_container}>
          <div className={styles.about_container}>
            <AboutSection
              faIcon={faShieldHalved}
              faColor={"#5e75e5"}
              faWidth={"80px"}
              title={"Example title Example Title Example Title"}
              text={"Trusted by 50,000+ Minecraft networks since 2015. Stay online no matter what threats face you. The ideal solution for gaming networks that demand low latency and 100% uptime."}
            />
            <AboutSection
              faIcon={faShieldHalved}
              faColor={"#5e75e5"}
              faWidth={"40px"}
              title={"Example title Example Title Example Title"}
              text={"Trusted by 50,000+ Minecraft networks since 2015. Stay online no matter what threats face you. The ideal solution for gaming networks that demand low latency and 100% uptime."}
            />
            <AboutSection
              faIcon={faShieldHalved}
              faColor={"#5e75e5"}
              faWidth={"40px"}
              title={"Example title Example Title Example Title"}
              text={"Trusted by 50,000+ Minecraft networks since 2015. Stay online no matter what threats face you. The ideal solution for gaming networks that demand low latency and 100% uptime."}
            />
            <AboutSection
              faIcon={faShieldHalved}
              faColor={"#5e75e5"}
              faWidth={"40px"}
              title={"Example title Example Title Example Title"}
              text={"Trusted by 50,000+ Minecraft networks since 2015. Stay online no matter what threats face you. The ideal solution for gaming networks that demand low latency and 100% uptime."}
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
