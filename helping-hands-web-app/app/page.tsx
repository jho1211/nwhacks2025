import styles from "./style.module.css"

export default function LandingPage() {
 return(
    <>
  <header>
    <div className="logo">
    <img src="/helpinghandlogo.png" alt="Logo"/>
    </div>
    <nav className={styles.navbar}>
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
                    <a href="/" className="navbar__links">
                    Profiles
                    </a>
                </li>
                <li className={styles.navbar__item}>
                    <a href="/" className="navbar__links">
                    Testimonies
                    </a>
                </li>
                <li className={styles.navbar__btn}>
                    <a href="/" className="button">
                    Log In
                    </a>
                </li>
            </ul>
        </div>
    </nav>
  </header>
 

<main>

    <div className={styles.main__picture}>
        <img src="/hugging_official.jpg" alt="Main Picture"/>
    <div/>

    </div>
    <section className={styles.main__page}>
      <h2>Welcome to Helping Hand</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
      <p>Sign in as:</p>
      <div className={styles.signin}>
        <button className={styles.mentor__button__signin}>Mentor</button>
        <div className={styles.gap}/>
        <button className={styles.mentee__button__signin}>Mentee</button>
        </div>
        <p>or Sign up as:</p>
        <div className={styles.signup}>
        <button className={styles.mentor__button__signup}>Mentor</button>
        <div className={styles.gap}/>
        <button className={styles.mentee__button__signup}>Mentee</button>
        </div>
    </section>
    <section className={styles.icons}>
      <div className={styles.donation__btn}>
        <img src="/heartinhand.png" alt="Heart Icon"/>
        <h3>Donations</h3>
        <p>Become a donor and support a member of your community.</p>
      </div>
      <div className={styles.profiles__btn}>
        <img src="/profilepic.png" alt="Profile Icon"/>
        <h3>Profiles</h3>
        <p>Browse profiles of mentees in your area!</p>
      </div>
      <div className={styles.testimonies__btn}>
        <img src="/handshake.png" alt="Handshake Icon"/>
        <h3>Testimonies</h3>
        <p>Read how Helping Hand changed lives.</p>
      </div>
    </section>

    <section className={styles.preview}>
      <h2>Preview Mentee Profiles</h2>
      <div className="profile-slider">
        <div className={styles.jack}>
          <img src="/homelessman2.jpg" alt="Jack's profile picture"/>
          <h4>Jack</h4>
          <p>"Hey! I'm Jack. I used to work in construction and I'm interested in working again!"</p>
        </div>
        <div className={styles.gracienne}>
          <img src="/homelesswoman1.jpg" alt="Gracienne's profile picture"/>
          <h4>Gracienne</h4>
          <p>"Hi I'm Gracienne. I like to draw and I love listening to hip-hop."</p>
        </div>
        <div className={styles.billy}>
          <img src="/homelessman1.jpg" alt="Billy's profile picture"/>
          <h4>Billy</h4>
          <p>"Hi I'm Billy. I love creating art and supporting my community."</p>
        </div>
      </div>
    </section>
  </main>
</>

 )


}
    