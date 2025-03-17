import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import DeleteDrawer from "../../components/SearchDrawer";
import NotificationDrawer from "../../components/NotificationDrawer";
import UserList from "../../components/UserList";
import { ChatContext } from "../../context/ChatContext";
import ChatBox from "../../components/ChatBox";

const Home = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);
  return (
    <Flex height="100vh" width="100%" flexDirection="column">
      <DeleteDrawer />
      <NotificationDrawer />
      <Flex flexDirection="column" height="100%">
        <Navbar />
        <Flex width="100vw" height="calc(100% - 80px)" background="red">
          <UserList />
          {selectedUser && <ChatBox />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
