"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User, Wishlist, Wish } from '@/app/models/models';
import axios from "@/app/utils/axios_instance";
import "./styles.css";

export default function ProfilePage({params}: {params: Promise<{ uid: string }>}) {
    const uid = use(params).uid;
    const [user, setUser] = useState<User>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [wishlist, setWishlist] = useState<Wishlist>();

    useEffect(() => {
        const fetchedUser = axios.get<User>(`user/${uid}`)
        .then(resp => setUser(resp.data))
        .catch(err => setErrorMsg(err.message));
    }, [])

    useEffect(() => {
        if (user && user.role == "mentee") {
            // fetch the wishlist for the user
            const wishlist = axios.get<Wishlist>(`wishlist/${uid}`)
            .then(resp => setWishlist(resp.data))
            .catch(err => setErrorMsg(err.message));
        } else {
            return;
        }
    }, [user])

    return (
        <div>
            {errorMsg == "" ? null : <div>{errorMsg}</div>}
            <div>
                <img src={user?.profile_img} width={100} height={100}></img>
                <div>{user?.name}</div>
                <div>{user?.bio}</div>
            </div>
            {user?.role == "mentee" ? <div>
                <table className="wishlist-table">
                    <thead>
                        <tr>
                            <td>Item Name</td>
                            <td>Item URL</td>
                            <td>Priority</td>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist?.wishlist.map(
                            (wlItem: Wish, idx: number) => {
                                return (
                                <tr key={`row-${idx}`}>
                                    <td key={`name-${idx}`}>{wlItem.item_name}</td>
                                    <td key={`url-${idx}`}>{wlItem.url}</td>
                                    <td key={`pri-${idx}`}>{wlItem.priority}</td></tr>)
                            }
                        )}
                    </tbody>
                </table>
            </div> : null}
        </div>
    )
}