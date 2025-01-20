"use client"

import { Connection } from "@/app/models/models";
import "./styles.css"
import ConnectionRow from "../ConnectionRow/ConnectionRow";

export default function ConnectionsTable(props: {connections: Connection[], loggedUid: string}) {
    return (
    <div>
        <div className="connections-table-header">My Connections</div>
        <div className="connections-table">
            {props.connections.map((conn, idx) => <ConnectionRow key={idx} conn={conn} uid={props.loggedUid}></ConnectionRow>)}
        </div>
    </div>)
}