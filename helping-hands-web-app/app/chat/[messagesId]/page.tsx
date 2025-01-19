"use client";
import { useRef, useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { type Message as MessageType } from "../../models/models";
import styles from "../chat.module.css";
import Image from "next/image";
import SendMessage from "../components/SendMessage/SendMessage";
import { db } from "@/lib/firebase/clientApp";
import { userStore } from "@/store/user";

import Message from "../components/Message/Message";
export default function ChatPage({
  params,
}: {
  params: Promise<{ messagesId: string }>;
  searchParams: { [key: string]: string };
}) {
  const messagesId = use(params).messagesId;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("user");
  const user = userStore((state) => state.user);

  useEffect(() => {
    const q = query(
      collection(db, "message"),
      where("messagesId", "==", messagesId),
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
          senderId: data.senderId,
          messagesId: data.messagesId,
        };
        fetchedMessages.push(message);
      });

      //   const sortedMessages = fetchedMessages.sort(
      //     (a, b) => a.timestamp - b.timestamp
      //   );
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [messagesId]);

  return (
    <div className={styles.chatbox}>
      <div className={styles.header}>
        {name}
        <Image
          src="https://placehold.co/400/"
          alt="Jack"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            // make it better if I have time
            uid={user!.uid}
          />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} messagesId={messagesId} />
    </div>
  );
}
