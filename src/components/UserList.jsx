import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserListCard from "./UserListCard";

const UserList = () => {
  const { userList } = useContext(UserContext);
  return (
    <Flex
      flexDirection="column"
      width="25vw"
      height="100%"
      background="var(--dark-background)"
      overflowX="scroll"
    >
      {userList?.map((item) => {
        return <UserListCard {...item} />;
      })}
    </Flex>
  );
};

export default UserList;
