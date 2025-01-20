"use client"

import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signout() {
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        signOut(auth).then(() => {
            router.push("/");
        }).catch(() => {
            console.error("Couldn't signout");
        });
    }, [auth, router]);

    return (<div>Signing out...</div>)
}