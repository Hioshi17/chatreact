import React, { useEffect, useRef } from "react";
import "./Chat.css";

interface MessageProps {
  text: string;
  sender: string;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, sender, isCurrentUser }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add("new");
      const timeoutId = setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.classList.remove("new");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div
      className={`message ${isCurrentUser ? "current-user" : "other-user"}`}
      ref={messageRef}
    >
      <strong>{sender}:</strong> <span>{text}</span>
    </div>
  );
};

export default Message;
