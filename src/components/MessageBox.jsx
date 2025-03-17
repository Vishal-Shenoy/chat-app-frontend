import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const MessageBox = (props) => {
  const ref = useRef();
  const [userMessage, setUserMessage] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { socket } = useContext(SocketContext);
  const { message, createdAt, updateAt, _id, receiverId, senderId, myId } =
    props;

  const handleDelete = () => {
    const data = {
      senderId: senderId,
      receiverId: receiverId,
      messageId: _id,
    };
    socket.emit("delete-message", data);
    ref?.current?.remove();
  };

  useEffect(() => {
    setUserMessage(message);
  }, []);

  useEffect(() => {
    socket.on(`delete-message-user-${_id}`, (data) => {
      const { acknowledged, deletedCount } = data;
      if (acknowledged && deletedCount > 0) ref?.current?.remove();
    });

    socket.on(`update-message-user-${_id}`, (data) => {
      const { message } = data;
      setUserMessage(message);
    });
  }, []);

  const handleUpdateMessage = () => {
    const value = {
      newMessage: userMessage,
      messageId: _id,
      senderId: senderId,
      receiverId: receiverId,
    };
    socket.emit("update-message", value);
    setIsEditClicked(false);
  };

  const handleCancel = () => {
    setUserMessage(message);
    setIsEditClicked(false);
  };

  return (
    <Flex ref={ref}>
      {isEditClicked ? (
        <Flex flexDirection="column" marginLeft="auto">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            resize={true}
            color="#ffffff"
          />
          <Flex marginTop="1vh" gap="10px">
            <Text
              color="#ffffff"
              background="var(--dark-background)"
              padding="1vw"
              cursor="pointer"
              onClick={handleCancel}
            >
              Cancel
            </Text>
            <Text
              color="#ffffff"
              padding="1vw"
              cursor="pointer"
              onClick={handleUpdateMessage}
              background="var(--dark-background)"
            >
              Update
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Menu>
          <MenuButton
            width="fit-content"
            padding=".5vw"
            background="var(--card-background)"
            margin="10px"
            borderRadius="10px"
            color="#ffffff"
            marginLeft={senderId == myId && "auto"}
          >
            {userMessage}
          </MenuButton>
          {senderId === myId && (
            <MenuList>
              <MenuItem onClick={() => setIsEditClicked(true)}>
                Edit Message
              </MenuItem>
              <MenuItem onClick={() => handleDelete()}>Delete Message</MenuItem>
            </MenuList>
          )}
        </Menu>
      )}
    </Flex>
  );
};

export default MessageBox;
