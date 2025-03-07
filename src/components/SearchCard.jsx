import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { color } from "../constants/color";
import { IoMdAdd } from "react-icons/io";
import { ApiCall } from "../constants/axios";
import { AppContext } from "../context/AppContext";
import loaderGif from "../assets/loading.gif";
import {
  addFriendEndPoint,
  deleteRequestEndPoint,
} from "../constants/endpoint";
import { FiMinus } from "react-icons/fi";
import { showToast } from "../utils/toast";
import { SocketContext } from "../context/SocketContext";
const SearchCard = (data) => {
  const { _id, email, userName, profileUrl, isFriendRequestSent } = data;
  const { socket } = useContext(SocketContext);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AppContext);
  const [sentRequest, setSentRequest] = useState(false);

  const handleAddFriend = async (requestedId) => {
    const values = {
      requestedId: requestedId,
      requesterId: user?._id,
    };
    setLoader(true);
    const { status, message, data } = await ApiCall(
      "POST",
      addFriendEndPoint(),
      values
    );
    if (status === 200) {
      showToast(message, "success");
      setSentRequest(true);
      handleSocket(requestedId);
    } else {
      showToast(message, "error");
    }
    setLoader(false);
  };

  const handleDeleteRequest = async (requestedId) => {
    const values = {
      requestedId: requestedId,
      requesterId: user?._id,
    };
    setLoader(true);
    const { status, message, data } = await ApiCall(
      "PUT",
      deleteRequestEndPoint(),
      values
    );
    if (status === 200) {
      showToast(message, "success");
      setSentRequest(false);
      handleSocket(requestedId);
    } else {
      showToast(message, "error");
    }
    setLoader(false);
  };

  const handleSocket = (id) => {
    socket.emit("trigger-notification", { userId: id });
  };

  useEffect(() => {
    setSentRequest(isFriendRequestSent);
  }, []);

  return (
    <Flex paddingInline="1vw" alignItems="center" width="100%" height="80px">
      <Flex height="70px" width="70px" borderRadius="50%">
        <Image height="70px" width="70px" borderRadius="50%" />
      </Flex>
      <Flex flexDirection="column" marginLeft="2vw">
        <Text>{userName}</Text>
        <Text>{email}</Text>
      </Flex>
      <Flex
        marginLeft="auto"
        height="30px"
        width="40px"
        borderRadius="5px"
        background={color.BLUE}
        color="white"
        justifyContent="center"
        alignItems="center"
      >
        {loader ? (
          <Image src={loaderGif} height="20px" width="20px" />
        ) : sentRequest ? (
          <FiMinus onClick={() => handleDeleteRequest(_id)} cursor="pointer" />
        ) : (
          <IoMdAdd onClick={() => handleAddFriend(_id)} cursor="pointer" />
        )}
      </Flex>
    </Flex>
  );
};

export default SearchCard;
