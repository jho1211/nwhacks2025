"use client"

import { firebaseApp } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { FormEvent, ChangeEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import "./styles.css";
import { User, Wishlist } from "@/app/models/models";
import axios from "@/app/utils/axios_instance";
import Img from "next/image";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPw, setConfirmPw] = useState<string>("");
    const [pwAlert, setPwAlert] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [confirmPwAlert, setConfirmPwAlert] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [photoAlert, setPhotoAlert] = useState<string>("");
    const [image, setImage] = useState<HTMLImageElement>();
    const [role, setRole] = useState<string>("mentor");

    const router = useRouter();
    const minPasswordLength : number = 6;
    const maxImageSize = 1 * 1024 * 1024;
    const newWidth = 100;
    const newHeight = 100;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (password !== confirmPw) {
            setConfirmPwAlert("Your passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
        .then((user: UserCredential) => {
            const userData : User = {
                uid: user.user.uid,
                name: name,
                bio: bio,
                profile_img: image!.src,
                role: role
            };
            initializeUser(userData);
            router.push("/user/signin");
        })
        .catch(err => setError(err.message));
    }

    async function initializeUser(user: User) {
        axios.post("user", user)
        .then(resp => console.log(resp))
        .catch(err => setError(err.message));

        const wishlist : Wishlist = {
            uid: user.uid,
            wishlist: []
        };

        axios.post("wishlist", wishlist)
        .then(resp => console.log(resp))
        .catch(err => setError(err.message));;
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleRole = () => {
        if (role == "mentor") {
            setRole("mentee");
        } else {
            setRole("mentor");
        }
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (target.files && target.files!.length > 0) {
            const imgFile: File = target.files[0]
            try {
                readImage(imgFile);
            } catch (e) {
                if (e instanceof Error) setPhotoAlert(e.message);
            }
        } else {
            return;
        }
    }

    const createImage = (src: string) => {
        const image = new Image();
        image.height = newHeight;
        image.width = newWidth;
        image.src = src;
    
        return image;
    }
    
    const readImage = (f: File) => {    
        if (f.size > maxImageSize) {
            console.error("Image is too large");
            throw new Error("Image is too large");
        }
    
        const fr = new FileReader();
        fr.onload = () => {
            const img = createImage(fr.result as string);
            setImage(img);
        }
        fr.readAsDataURL(f);
    }

    return (<div className="background">
        <div className="signup-container">
                <h1>Create an Account</h1>
                {error == "" ? null : <div>{error}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="switch-labels">
                        <div className="slider-label">Mentor</div>
                        <label className="switch">
                            <input type="checkbox" onChange={handleRole}></input>
                            <span className="slider round"></span>
                        </label>
                        <div className="slider-label">Mentee</div>
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="emailInput">Email</label>
                        <input 
                            type="email" 
                            id="emailInput" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}>
                        </input>
                    </div>
                    <div className="input-group">
                        {pwAlert == "" ? null : <label htmlFor="pwInput" className="alert-text">{pwAlert}</label>}
                        <label htmlFor="pwInput">Password</label>
                        <input 
                        type="password" 
                        id="pwInput" 
                        value={password} 
                        onChange={handlePassword}
                        required={true}>
                        </input>
                    </div>
                    <div className="input-group">
                        {confirmPwAlert == "" ? null : <label htmlFor="confirmPwInput" className="alert-text">{confirmPwAlert}</label>}
                        <label htmlFor="confirmPwInput">Confirm Password</label>
                        <input 
                        type="password" 
                        id="confirmPwInput" 
                        value={confirmPw} 
                        onChange={(e) => setConfirmPw(e.target.value)}
                        required={true}>
                        </input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} required={true}></input>
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
                        {photoAlert == "" ? null : <label htmlFor="imageInput" className="alert-text">{photoAlert}</label>}
                        <label htmlFor="imageInput">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} required={true}></input>
                        {image && image.src ? (
        <Img src={image.src} width={100} height={100} alt="Profile Preview" />
    ) : null}
</div>
                    <button type="submit" className="create-button">Create Account</button>
                </form>
            </div>
            </div>)
}