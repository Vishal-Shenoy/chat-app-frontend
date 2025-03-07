import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserListCard = (props) => {
  const { userName, profileUrl, _id, email } = props?.friend;
  return (
    <Flex key={_id} width="100%" height="100px" bg="red">
      <Flex flexDirection="column">
        <Text>{userName}</Text>
        <Text>{email}</Text>
      </Flex>
    </Flex>
  );
};

export default UserListCard;
