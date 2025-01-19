import styles from "./chat.module.css";
import { Connection, User } from "../models/user";
import InboxItem from "./components/InboxItem/InboxItem";
import { CONNECTIONS, USERS } from "./mock";

const user: User = {
  uid: "1",
  first_name: "Test",
  last_name: "Test",
  bio: "foo",
  profile_img: "404.png",
  role: "mentee",
};

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //   const userIds = CONNECTIONS.map(
  //     (connection: Connection) => connection.participants
  //   )
  //     .flat()
  //     .filter((id) => id != user.uid);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.title}>
          <h3 className={styles.h3}>Chat Inbox</h3>
        </div>
        {USERS.map((user) => (
          <InboxItem key={user.uid} user={user} />
        ))}
      </nav>
      {children}
    </div>
  );
}
