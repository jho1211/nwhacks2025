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
    const [mentees, setMentees] = useState<User[]>([]);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert("You need to be logged in to access this page.")
            router.push("/");
        }
        return (<div>You need to be logged in to access this page.</div>)
    })

    useEffect(() => {
        axios.get<User[]>('mentees')
        .then(resp => setMentees(resp.data))
        .catch(err => alert("Error obtaining mentees"));
    }, [])

    const galleryItems = mentees.map((mentee: User, idx) => <GalleryItem key={idx} user={mentee}></GalleryItem>)

    return (
        <div>
            <Navbar bgColor="#FFCE9DAD"></Navbar>
            <div className="gallery-page">
                <div className="gallery-title">Profiles</div>
                <div className="gallery-container">
                    {galleryItems}
                </div>
            </div>
        </div>
    )
}