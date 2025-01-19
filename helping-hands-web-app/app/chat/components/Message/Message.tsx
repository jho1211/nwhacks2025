import React from "react";
import { type Message } from "@/app/models/models";
import Image from "next/image";
import styles from "./message.module.css";

const user: User = {
  uid: "1",
  first_name: "Test",
  last_name: "Test",
  bio: "foo",
  profile_img: "404.png",
  role: "mentee",
};

// TODO: how to get user image?

const Message = ({ message }: { message: Message }) => {
  return (
    <div
      className={`${styles.message} ${
        message.sender_id == user.uid
          ? `${styles.receiver}`
          : `${styles.sender}`
      }`}
    >
      <Image
        src="https://placehold.co/100/100"
        alt="temp"
        width={50}
        height={50}
      />
      <p className={styles.text}>{message.content}</p>
    </div>
  );
};

export default Message;
