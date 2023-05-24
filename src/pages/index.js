import styles from "@/styles/index.module.css"
import chatFilterLogo from "../../public/logo-white.svg"
import purpleBackground from '../../public/purple-bg.jpg'
import Image from 'next/image'
import AboutSection from "../../../chat-filter-web/src/(components)/AboutSection";
import FooterSection from "../../../chat-filter-web/src/(components)/FooterSection";
import { faTriangleExclamation, faBolt } from "@fortawesome/free-solid-svg-icons";

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
              Harnessing the power of AI, our service ensures safe and respectful conversations by detecting toxicity in messages. Trust our intelligent system to analyze and filter out harmful content, promoting a positive online environment.
            </p>
          </div>
        </div>

        <div className={styles.main_container}>
          <div className={styles.about_container}>
            <AboutSection
              faIcon={faTriangleExclamation}
              faColor={"#6f2de0"}
              faWidth={"40px"}
              title={"Advanced Toxicity Detection"}
              text={"Utilize ChatFilter's cutting-edge AI algorithms to accurately identify and flag toxic content, protecting your online community from harmful messages."}
            />
            <AboutSection
              faIcon={faBolt}
              faColor={"#6f2de0"}
              faWidth={"40px"}
              title={"Real-time Monitoring System"}
              text={"Stay one step ahead with ChatFilter's real-time monitoring feature, enabling instant detection and prevention of toxic messages as they are being sent."}
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
