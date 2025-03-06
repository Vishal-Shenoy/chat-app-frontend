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
  const {notificationCount} = useContext(NotificationContext);
  return (
    <Flex
      height="80px"
      width={{ lg: "100%" }}
      borderBottom="solid 1px lightgray"
    >
      <Flex
        flexDirection="row"
        marginLeft="auto"
        width="fit-content"
        paddingInline="1vw"
        alignItems="center"
        gap="1vw"
      >
        <Flex gap="2vw" fontSize={{ lg: "30px" }}>
          <IoSearch onClick={() => setSearchDrawer(true)}/>
            <Flex className="notificationIcon" data-count={notificationCount}>
          <MdOutlineNotifications  onClick={() => setNotificationDrawer(true)} />
          </Flex>
        </Flex>
        <Flex height="50px" width="50px" borderRadius="50%">
          <Image
            src={profile}
            height="50px"
            width="50px"
            borderRadius="50%"
            objectFit="cover"
          />
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize={{ lg: "18px" }}>{user?.userName}</Text>
          <Text fontSize={{ lg: "12px" }}>{user?.email}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
