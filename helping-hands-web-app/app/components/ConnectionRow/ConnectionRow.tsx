"use client"

import { Connection, User } from "@/app/models/models"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from "@/app/utils/axios_instance";
import "./styles.css"
import { useRouter } from "next/navigation";

export default function ConnectionRow(props: {uid: string, conn: Connection}) {
    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        props.conn.participants[0] == props.uid ? 
        axios.get(`user/${props.conn.participants[1]}`).then(resp => setUser(resp.data)) :
        axios.get(`user/${props.conn.participants[0]}`).then(resp => setUser(resp.data))
    }, [])

    const handleAccept = (other: string) => {
        const newConn: Connection = {
            id: props.conn.id,
            messagesId: props.conn.messagesId,
            participants: props.conn.participants,
            status: "accepted"
        };
        props.conn.status = "accepted";
        axios.put("/connections", newConn).then(() => alert(`Accepted the connection with ${other}`));
    }

    const handleReject = (other: string) => {
        const newConn: Connection = {
            id: props.conn.id,
            messagesId: props.conn.messagesId,
            participants: props.conn.participants,
            status: "rejected"
        };
        props.conn.status = "rejected";
        axios.put("/connections", newConn).then(() => alert(`Rejected the connection with ${other}`));
    }
    
    return (user ? <div className="conn">
        <div className="connection-row-profile">
            <img className="connection-row-profile-img" src={user.profile_img}></img>
            <div className="connection-row-profile-name">{user.name}</div>
        </div>
        {props.conn.status == "pending" ? 
        <div className="connection-row-actions">
            <div className="connection-row-action" onClick={() => handleAccept(user.name)}>✅</div>
            <div className="connection-row-action" onClick={() => handleReject(user.name)}>❌</div>
        </div> : 
        props.conn.status == "accepted" ? <Link href={`/chat/${props.conn.messagesId}`}><button className="connection-row-chat-btn">CHAT</button></Link> : 
        <div className="connection-row-rejected-text">REJECTED</div>}
    </div> : null)
}