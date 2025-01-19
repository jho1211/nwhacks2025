import { User } from "@/app/models/user";
import Image from "next/image";
import styles from "./inbox-item.module.css";

const InboxItem = ({ user }: { user: User }) => {
  return (
    <div className={styles.container}>
      <Image
        src={user.profile_img}
        alt={user.first_name}
        width={50}
        height={50}
      />
      <h4 className={styles.name}>{user.first_name}</h4>
    </div>
  );
};

export default InboxItem;
