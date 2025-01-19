"use client";
import { useState, FormEvent } from "react";
import styles from "./send-message.module.css"; // Import the CSS module

const SendMessage = ({
  scroll,
}: {
  scroll: React.RefObject<HTMLSpanElement | null>;
}) => {
  const [message, setMessage] = useState("");
  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    // send

    setMessage("");
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.sendMessageContainer}>
      <form onSubmit={(event) => sendMessage(event)} className="send-message">
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className={styles.formInput}
          placeholder="type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.sendMessageButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
