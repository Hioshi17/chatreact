import React, { useMemo, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import { Button, TextField } from "@mui/material";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Привет!", sender: "User1" },
    {
      id: 2,
      text: "Ты можешь использовать 2 кнопки для отправки сообщений!",
      sender: "User2",
    },
    { id: 3, text: "Попробуй же!", sender: "User1" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentUser, setCurrentUser] = useState("User1");

  const handleSendMessage = React.useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: currentUser,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");
    }
  }, [inputValue, currentUser, messages]);

  const handleChangeUser = React.useCallback(
    (newUser: string) => setCurrentUser(newUser),
    []
  );

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
            isCurrentUser={message.sender === currentUser}
          />
        ))}
      </div>
      <div className="input-container">
        <TextField
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Написать сообщение..."
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Отправить
        </Button>
      </div>
      <div className="button-container">
        <Button
          variant={currentUser === "User1" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleChangeUser("User1")}
        >
          User1
        </Button>
        <Button
          variant={currentUser === "User2" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleChangeUser("User2")}
        >
          User2
        </Button>
      </div>
    </div>
  );
};

export default Chat;
