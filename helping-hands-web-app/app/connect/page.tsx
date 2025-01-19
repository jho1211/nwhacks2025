"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "../models/models";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { firebaseApp } from "@/lib/firebase/clientApp";

export default function ConnectPage() {
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert("You need to be logged in to access this page.")
            router.push("/");
        }
        return (<div>You need to be logged in to access this page.</div>)
    })
}