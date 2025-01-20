import { User } from "@/app/models/models";
import Link from "next/link";
import Image from "next/image";
import "./styles.css"

export default function GalleryItem(props: {user: User}) {
    const user = props.user;

    return (<div className="gallery-card">
        <div>
            <Image src={user.profile_img} alt={user.name} className="gallery-profile-img"></Image>
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