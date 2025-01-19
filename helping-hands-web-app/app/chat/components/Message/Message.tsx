import React from "react";
import { type Message } from "@/app/models/models";
import Image from "next/image";
import styles from "./message.module.css";

// TODO: how to get user image?

const Message = ({ message, uid }: { message: Message; uid: string }) => {
  return (
    <div
      className={`${styles.message} ${
        message.senderId == uid ? `${styles.receiver}` : `${styles.sender}`
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
