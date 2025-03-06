import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import DeleteDrawer from "../../components/SearchDrawer";
import NotificationDrawer from "../../components/NotificationDrawer";

const Home = () => {
  return (
    <Flex height="100%" width="100%" flexDirection="column">
      <DeleteDrawer />
      <NotificationDrawer />
      <Navbar />
    </Flex>
  );
};

export default Home;
