"use client"

import { firebaseApp } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import "./styles.css";
import Link from "next/link";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push(`/user/${user.uid}`);
        } else {
            return;
        }
      });

    async function handleSubmit(event: any) {
        event.preventDefault();
        setError("");

        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            const uid = user.user.uid;
            console.log(`Your uid is: ${uid}`);
        })
        .catch(err => setError(err.message));
    }

    return (<div className="signup-container">
                <h1>Sign-in</h1>
                {error == "" ? null : <div>{error}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="emailInput">Email</label>
                        <input 
                            type="email" 
                            id="emailInput" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="pwInput">Password</label>
                        <input 
                        type="password" 
                        id="pwInput" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <button type="submit" className="create-button">Sign-in</button>
                    <div className="create-account">
                        <Link href="/user/signup">Create an Account</Link>
                    </div>
                </form>
            </div>)
}