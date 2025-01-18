"use client"

import { firebaseApp } from "../../../lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./styles.css";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPw, setConfirmPw] = useState<string>("");
    const [pwAlert, setPwAlert] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [confirmPwAlert, setConfirmPwAlert] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const router = useRouter();
    const minPasswordLength : number = 6;

    async function handleSubmit(event: any) {
        event.preventDefault();
        setError("");

        if (password !== confirmPw) {
            setConfirmPwAlert("Your passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
        .then(user => {
            console.log("Created a new account successfully, logging in...");
            router.push("user/login");
        })
        .catch(err => setError(err.message));
    }

    const handlePassword = (e: any) => {
        if (
            e.target.value.length < minPasswordLength &&
            e.target.value.length !== 0
        ) {
            setPwAlert(
                `Your password must be at least ${minPasswordLength} characters long`
            );
        } else {
            setPwAlert("");
        }

        setPassword(e.target.value);
    };

    const handleImageUpload = (e: Event) => {
        const target : HTMLInputElement = e.target as HTMLInputElement;
        if (target.files && target.files!.length > 0) {
            const imgFile = target.files[0]
        }
    }

    return (<div className="signup-container">
                <h1>Create an Account</h1>
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
                        {pwAlert == "" ? null : <label htmlFor="pwInput">{pwAlert}</label>}
                        <label htmlFor="pwInput">Password</label>
                        <input 
                        type="password" 
                        id="pwInput" 
                        value={password} 
                        onChange={handlePassword}>
                        </input>
                    </div>
                    <div className="input-group">
                        {confirmPwAlert == "" ? null : <label htmlFor="confirmPwInput">{confirmPwAlert}</label>}
                        <label htmlFor="confirmPwInput">Confirm Password</label>
                        <input 
                        type="password" 
                        id="confirmPwInput" 
                        value={confirmPw} 
                        onChange={(e) => setConfirmPw(e.target.value)}>
                        </input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="bioInput">Bio</label>
                        <textarea 
                        id="bioInput" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        rows={5}>
                        </textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="imageInput">Profile Picture</label>
                        <input type="file" accept="image/*"></input>
                        <img src={photoUrl == "" ? undefined : photoUrl} width={100} height={100}></img>
                    </div>
                    <button type="submit" className="create-button">Create Account</button>
                </form>
            </div>)
}