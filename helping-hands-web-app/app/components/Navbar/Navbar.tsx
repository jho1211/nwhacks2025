import Link from "next/link";
import styles from "./style.module.css";

export default function Navbar(props: {bgColor: string}) {
    return (
        <header>
    <div style={{backgroundColor: props.bgColor}}>
    <img src="/helpinghandlogo.png" alt="Logo"/>
    </div>
    <nav className={styles.navbar} style={{backgroundColor: props.bgColor}}>
        <div className={styles.navbar__container}>
            <ul className={styles.navbar__menu}>
                <li className={styles.navbar__item}>
                    <a href="/" className="navbar__links">
                    Home
                    </a>
                </li>
                <li className={styles.navbar__item}>
                    <a href="/tech.html" className="navbar__links">
                    About
                    </a>
                </li>
                <li className={styles.navbar__item}>
                    <a href="/connect" className="navbar__links">
                    Profiles
                    </a>
                </li>
                <li className={styles.navbar__item}>
                    <a href="/" className="navbar__links">
                    Testimonies
                    </a>
                </li>
                <Link href="user/signin" className="button">
                  <li className={styles.navbar__btn}>
                    Sign In
                  </li>
                </Link>
            </ul>
        </div>
    </nav>
  </header>
    )
}