"use client";
import { useRef, useState, useEffect } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { type Message as MessageType } from "../models/models";
import styles from "./chat.module.css";
import Image from "next/image";
import SendMessage from "./components/SendMessage/SendMessage";
import { MESSAGES_1 } from "./mock";
import { db } from "@/lib/firebase/clientApp";

import Message from "./components/Message/Message";
export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageType[] = [];

      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        // Type assertion or validation
        const message: MessageType = {
          id: doc.id,
          content: data.content,
          status: data.status,
          timestamp: data.timestamp,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
        };
        fetchedMessages.push(message);
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  console.log({ messages });

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
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </div>
  );
}
