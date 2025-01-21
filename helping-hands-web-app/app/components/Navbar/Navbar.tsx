import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";

export default function Navbar(props: {bgColor: string, uid: string}) {
    return (
        <header>
    <div style={{backgroundColor: props.bgColor}}>
    <Image src="/helpinghandlogo.png" width={449} height={263} alt="Logo"/>
    </div>
    <nav className={styles.navbar} style={{backgroundColor: props.bgColor}}>
        <div className={styles.navbar__container}>
            <ul className={styles.navbar__menu}>
                <li className={styles.navbar__item}>
                    <Link href="/" className="navbar__links">
                    Home
                    </Link>
                </li>
                
                <li className={styles.navbar__item}>
                    <Link href="/connect" className="navbar__links">
                    Profiles
                    </Link>
                </li>
                <li className={styles.navbar__item}>
                    <Link href="/" className="navbar__links">
                    Testimonies
                    </Link>
                </li>
                {props.uid != "" ? <li className={styles.navbar__item}>
                    <Link href={`/user/${props.uid}`} className="navbar__links">
                    My Profile
                    </Link>
                </li> : null}
                {props.uid != "" ? <Link href="/user/signout" className="button">
                  <li className={styles.navbar__btn}>
                    Sign Out
                  </li>
                </Link> : <Link href="/user/signin" className="button">
                  <li className={styles.navbar__btn}>
                    Sign In
                  </li>
                </Link>}
            </ul>
        </div>
    </nav>
  </header>
    )
}