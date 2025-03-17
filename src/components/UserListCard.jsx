import { Flex, Text, Image } from "@chakra-ui/react";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { AppContext } from "../context/AppContext";
import profileImg from "../assets/profile.webp";

let selectedUserId = 0;

const UserListCard = (props) => {
  const [count, setCount] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const { selectedUser, setSelectedUser, selectedUserId, setSelectedUserId } =
    useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const { message, me } = props;
  const { userName, profileUrl, _id, email } = props?.friend;

  const handleSelectUser = () => {
    localStorage.setItem("selectedUser", _id);
    setCount(0);
    setSelectedUser({
      userName: userName,
      email: email,
      profileUrl: profileUrl,
      _id: _id,
    });
    setSelectedUserId(_id);
  };

  useEffect(() => {
    setNewMessage(message);
  }, []);

  useEffect(() => {
    if (selectedUserId === undefined) return;
    socket.on(me?.toString(), (data) => {
      let selectedUserId = localStorage.getItem("selectedUser");
      console.log(
        data?.senderId !== me,
        data?.senderId !== selectedUser?._id?.toString(),
        data?.senderId,
        me,
        data?.senderId,
        selectedUser?._id?.toString()
      );
      if (
        data?.senderId !== me &&
        data?.senderId !== selectedUserId?.toString()
      ) {
        setCount((prev) => prev + 1);
      }
      setNewMessage(data?.message);
    });
  }, [selectedUserId, socket, me, _id, selectedUser]);

  useEffect(() => {
    socket.on(_id?.toString(), (data) => {
      setNewMessage(data);
    });
  }, []);

  useEffect(() => {
    console.log(selectedUser, "this is changed");
  }, [selectedUser]);

  return (
    <Flex
      key={_id}
      width="100%"
      height="80px"
      bg="var(--background)"
      onClick={() => handleSelectUser()}
      alignItems="center"
      gap="1vw"
      cursor="pointer"
      paddingInline="1vw"
      marginInline="auto"
    >
      <Flex>
        <Image src={profileImg} height="40px" width="40px" borderRadius="50%" />
      </Flex>
      <Flex flexDirection="column" color="var(--text)" justifyContent="center">
        <Text fontSize="15px">{userName}</Text>
        <Text fontSize="12px">
          {newMessage?.length > 0 ? newMessage : email}
        </Text>
      </Flex>
      {count !== 0 && (
        <Flex
          marginLeft="auto"
          height="20px"
          width="20px"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          background="green"
          color="white"
        >
          <Text fontSize="10px">{count}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default UserListCard;
