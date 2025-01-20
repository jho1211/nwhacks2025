"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "../models/models";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { firebaseApp } from "@/lib/firebase/clientApp";
import axios from "@/app/utils/axios_instance";
import GalleryItem from "../components/GalleryItem/GalleryItem";
import "./styles.css"
import Navbar from "../components/Navbar/Navbar";

export default function ConnectPage() {
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    const [people, setPeople] = useState<User[]>([]);
    const [uid, setUid] = useState<string>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/user/signin");
                return (<div>You need to be logged in to access this page.</div>)
            } else {
                setUid(user.uid);
            }
        })
    })

    useEffect(() => {
        if (uid) {
            axios.get<User>(`user/${uid}`).then(resp => setUser(resp.data));
        }
    }, [uid])

    useEffect(() => {
        if (!user) {
            return;
        }
        const target = user.role == "mentee" ? "mentors" : "mentees";
        axios.get<User[]>(target)
        .then(resp => setPeople(resp.data))
        .catch(() => alert(`Error obtaining ${target}`));
    }, [user])

    const galleryItems = people.map((mentee: User, idx) => <GalleryItem key={idx} user={mentee}></GalleryItem>)

    return (
        <div>
            <Navbar bgColor="#FFCE9DAD" uid={uid ?? ""}></Navbar>
            <div className="gallery-page">
                {user ? <div className="gallery-title">{user?.role == "mentee" ? "Mentor" : "Mentee"} Profiles</div> : <div>Loading...</div>}
                <div className="gallery-container">
                    {galleryItems}
                </div>
            </div>
        </div>
    )
}