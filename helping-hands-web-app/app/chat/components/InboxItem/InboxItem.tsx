import { type UserWithMessagesId } from "../../layout";
import Link from "next/link";
import styles from "./inbox-item.module.css";

const InboxItem = ({ user }: { user: UserWithMessagesId }) => {  
  return (
    <Link href={`/chat/${user.messagesId}?userId=${user.uid}`}>
      <div className={styles.container}>
        <img src={user.profile_img} alt={user.name} width={50} height={50} />
        <h4 className={styles.name}>{user.name}</h4>
      </div>
    </Link>
  );
};

export default InboxItem;
