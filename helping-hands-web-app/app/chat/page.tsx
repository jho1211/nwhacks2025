"use client";
import { useRef } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import SendMessage from "./components/SendMessage/SendMessage";
import { MESSAGES_1 } from "./mock";
import Message from "./components/Message/Message";
export default function ChatPage() {
  const scroll = useRef<HTMLSpanElement>(null);
  return (
    <div className={styles.chatbox}>
      <div className={styles.header}>
        Jack
        <Image
          src="https://placehold.co/400/"
          alt="Jack"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.messages}>
        {MESSAGES_1.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </div>
  );
}
