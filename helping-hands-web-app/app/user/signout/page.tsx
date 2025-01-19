"use client"

import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";

export default function Signout() {
    const router = useRouter();

    const auth = getAuth(firebaseApp);
    signOut(auth).then(() => {
        router.push("/home");
    }).catch((error) => {
        console.error("Couldn't signout");
    });
    
    return (<div>Signing out...</div>)
}