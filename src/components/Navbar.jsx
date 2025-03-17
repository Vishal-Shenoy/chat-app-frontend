import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { color } from "../constants/color";
import profile from "../assets/profile.webp";
import { AppContext } from "../context/AppContext";
import { MdOutlineNotifications } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { NotificationContext } from "../context/NotificationContext";

const Navbar = () => {
  const {
    user,
    searchDrawer,
    setSearchDrawer,
    notificationDrawer,
    setNotificationDrawer,
  } = useContext(AppContext);
  const { notificationCount } = useContext(NotificationContext);
  return (
    <Flex
      height="80px"
      width={{ lg: "100%" }}
      background="var(--dark-background)"
    >
      <Flex
        flexDirection="row"
        marginLeft="auto"
        width="fit-content"
        paddingInline="1vw"
        alignItems="center"
        gap="1vw"
      >
        <Flex gap="1vw" fontSize={{ lg: "20px" }} color="var(--text)">
          <IoSearch onClick={() => setSearchDrawer(true)} />
          <Flex className="notificationIcon" data-count={notificationCount}>
            <MdOutlineNotifications
              onClick={() => setNotificationDrawer(true)}
            />
          </Flex>
        </Flex>
        <Flex height="40px" width="40px" borderRadius="50%">
          <Image
            src={profile}
            height="40px"
            width="40px"
            borderRadius="50%"
            objectFit="cover"
          />
        </Flex>
        <Flex flexDirection="column" color="var(--text)">
          <Text fontSize={{ lg: "16px" }}>{user?.userName}</Text>
          <Text fontSize={{ lg: "10px" }}>{user?.email}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
