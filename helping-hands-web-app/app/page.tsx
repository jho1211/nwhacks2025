"use client";

import styles from "./style.module.css";
import Navbar from "./components/Navbar/Navbar";
import Link from "next/link";
import { auth } from "@/lib/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else setUid("");
    });
  }, []);

  return (
    <>
      <Navbar bgColor="transparent" uid={uid ?? ""}></Navbar>
      <div className={styles.main__picture}>
        <img src="/hugging_official.jpg" alt="Main Picture" />
      </div>

      <main>
        <section className={styles.main__page}>
          <h2>Welcome to Helping Hand</h2>

          <p>
            Helping Hand is a mentorship program that aims to bridge the gap
            between the community and individuals experiencing homelessness,
            fostering meaningful connections and mutual support. By pairing
            compassionate mentors with those facing challenges such as drug
            addiction, unemployment, or unstable living conditions, we aim to
            provide personalized guidance and encouragement. We strive to
            empower individuals to rebuild their lives through job readiness,
            access to critical resources, and the companionship of someone who
            genuinely cares. Together, we strive to create a nurturing, more
            inclusive community where everyone has the opportunity to succeed.
          </p>
          <div className={styles.gap} />
        </section>

        <div className={styles.gap__big} />
        <div className={styles.missions__box}>
          <div className={styles.mission__section}>
            <h3>Our Mission</h3>
            <p>
              To empower those experiencing homelessness through mentorship,
              supplying of resources, and community support.
            </p>
          </div>
          <div className={styles.vision__section}>
            <h3>Our Vision</h3>
            <p>
              To inspire a society where compassion and connection drive
              transformation, and homelessness is no longer seen as an
              unsolvable crisis, but as an opportunity for collective care and
              empowerment.
            </p>
          </div>
          <div className={styles.gap}>
            <div className={styles.vision__section2}>
              <p>
                We envision a future where every person has access to
                mentorship, resources, and a community that believes in their
                potential to succeed. By bridging the gap between those in need
                and those willing to help, we seek to cultivate a culture where
                empathy translates into action, breaking down barriers of stigma
                and isolation. Together, we can empower individuals to rebuild
                their lives, achieve their goals, and become thriving members of
                a supportive and inclusive community. This platform will be a
                catalyst for change, transforming not only the lives of those it
                serves but also the broader societal attitudes toward
                homelessness—shifting from indifference to genuine care and
                proactive engagement. Be a part of this change and register to
                be a mentor today. If you are a prospective mentee, get started
                and create a profile to start on your journey to success.
              </p>
            </div>
          </div>
        </div>

        <section className={styles.icons}>
          <Link href="/connect">
            <div className={styles.donation__btn}>
              <img src="/heartinhand.png" alt="Heart Icon" />
              <h3>Donations</h3>
              <p>Become a donor and support a member of your community.</p>
            </div>
          </Link>
          <Link href="/connect">
            <div className={styles.profiles__btn}>
              <img src="/profilepic.png" alt="Profile Icon" />
              <h3>Profiles</h3>
              <p>Browse profiles of mentees in your area!</p>
            </div>
          </Link>
          <Link href="/">
            <div className={styles.testimonies__btn}>
              <img src="/handshake.png" alt="Handshake Icon" />
              <h3>Testimonies</h3>
              <p>Read how Helping Hand changed lives.</p>
            </div>
          </Link>
        </section>

        <div></div>
      </main>
    </>
  );
}
