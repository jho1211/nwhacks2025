import { User } from "@/app/models/models";
import Link from "next/link";
import "./styles.css"

export default function GalleryItem(props: {user: User}) {
    const user = props.user;

    return (<div className="gallery-card">
        <div>
            <img src={user.profile_img} className="gallery-profile-img"></img>
            <div className="gallery-profile-name">{user.name}</div>
            <div className="gallery-profile-bio">{user.bio}</div>
        </div>
        <div>
        <Link href={`/user/${user.uid}`}>
            <button className="gallery-view-btn">
                View
            </button>
        </Link>
        </div>
    </div>)
}