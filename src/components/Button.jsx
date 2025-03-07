import React from "react";
import { Flex,Image } from "@chakra-ui/react";
import { color } from "../constants/color";
import loader from "../assets/loading.gif"
const Button = ({ marginTop,loading,placeHolder,onPress }) => {
  return (
    <Flex
      borderRadius="10px"
      marginTop={marginTop}
      justifyContent="center"
      alignItems="center"
      height={{ base: "50px" }}
      background={color.BLUE}
      color={color.WHITE}
      cursor="pointer"
      width={{base:"100%"}}
      onClick={onPress}
    >
      {loading ? <Image src={loader} height="40px" /> : placeHolder}
    </Flex>
  );
};

export default Button;
