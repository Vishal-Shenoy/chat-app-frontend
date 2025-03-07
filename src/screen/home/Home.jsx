import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import DeleteDrawer from "../../components/SearchDrawer";
import NotificationDrawer from "../../components/NotificationDrawer";
import UserList from "../../components/UserList";

const Home = () => {
  return (
    <Flex height="100vh" width="100%" flexDirection="column">
      <DeleteDrawer />
      <NotificationDrawer />
      <Flex flexDirection="column" height="100%">
        <Navbar />
        <Flex width="100vw" height="100%">
          <UserList />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
