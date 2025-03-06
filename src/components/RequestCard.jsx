import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { ApiCall } from "../constants/axios";
import { deleteMyRequestEndPoint } from "../constants/endpoint";
import { showToast } from "../utils/toast";

const RequestCard = (props) => {
  const { userName, email, profileUrl, _id, updatedAt } = props?.requesterId;
  const { _id: mainId } = props;

  const handleDeleteRequest = async(id) => {
    const {status,data,message} = await ApiCall("DELETE",deleteMyRequestEndPoint(id));
    if(status == 200){
        showToast(message,"success");
    }else{
        showToast(message,"error");
    }
  }
  return (
    <Flex
      width="95%"
      height="80px"
      background="lightgray"
      borderRadius="10px"
      gap="10px"
      marginInline="auto"
      alignItems="center"
      paddingInline="10px"
    >
      <Flex height="70px" width="70px" background="blue" borderRadius="50%">
        <Image height="70px" width="70px" borderRadius="50%" />
      </Flex>
      <Flex flexDirection="column">
        <Text>{userName}</Text>
        <Text>{email}</Text>
      </Flex>
      <Flex flexDirection="column" gap="5px">
        <Flex
          height="30px"
          width="60px"
          background="red"
          justifyContent="center"
          alignItems="center"
        >
          Accept
        </Flex>
        <Flex
          height="30px"
          width="60px"
          background="lightgreen"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleDeleteRequest(mainId)}
        >
          Reject
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RequestCard;
