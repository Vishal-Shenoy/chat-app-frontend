import { Flex, Text, Input } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { AppContext } from "../context/AppContext";
import MessageBox from "./MessageBox";

const ChatBox = () => {
  const { selectedUser, setSelectedUser, userMessages, setUserMessages } =
    useContext(ChatContext);
  const { user } = useContext(AppContext);
  const [isOnline, setIsOnLine] = useState();
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("check-online-user", (data) => {
      const { message } = data;
      setIsOnLine(message);
    });
  }, []);

  useEffect(() => {
    socket.emit("check-online", { userId: selectedUser?._id, myId: user?._id });
  }, [user, selectedUser]);

  useEffect(() => {
    socket.on("send-message-user", (data) => {
      setUserMessages((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  const handleSendMessage = () => {
    socket.emit("send-message", {
      senderId: user?._id,
      receiverId: selectedUser?._id,
      message: message,
      date: new Date().toISOString(),
    });
    setMessage("");
  };

  return (
    <Flex
      flexDirection="column"
      background="var(--background)"
      width="75vw"
      paddingTop="10px"
      height="100%"
    >
      <Flex
        padding="20px"
        flexDirection="column"
        background="var(--dark-background)"
        width="98%"
        borderRadius="10px"
        marginInline="auto"
        color="var(--text)"
      >
        <Text fontSize="16px" display="flex" gap="1vw" alignItems="center">
          {selectedUser?.userName}{" "}
          <Text
            background={isOnline == "online" ? "green" : "red"}
            height="10px"
            width="10px"
            borderRadius="50%"
          ></Text>
        </Text>
        <Text fontSize="12px">{selectedUser?.email}</Text>
      </Flex>
      <Flex
        height="75%"
        width="100%"
        flexDirection="column"
        overflow="scroll"
        padding="4vh"
      >
        {userMessages?.map((item) => {
          return <MessageBox {...item} myId={user?._id} />;
        })}
      </Flex>
      <Flex>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="enter your message"
        />
        <button onClick={() => handleSendMessage()}>submit</button>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
