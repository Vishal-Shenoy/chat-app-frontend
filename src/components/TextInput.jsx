import React, { useState } from "react";
import { Input, Flex, Text } from "@chakra-ui/react";
import { color } from "../constants/color";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
const TextInput = ({ placeholder, label, marginTop, type, icon ,isError,helperText,onBlur,field}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Flex flexDirection="column" marginTop={marginTop} width="100%">
            <Text>{label}</Text>
            <Flex
                gap="1vw"
                border={`solid lightgrey 1px`}
                alignItems="center"
                paddingInline="10px"
                borderRadius="10px"
                height="50px"
            >
                {icon}{" "}
                <Input
                {...field}
                    type={
                        type === "password" ? (showPassword ? "text" : "password") : type
                    }
                    placeholder={placeholder}
                    height="5vh"
                    border="none"
                    focusRing="none"
                    onBlur={onBlur}
                />
                {type == "password" && (
                    <Flex>
                        {showPassword ? (
                            <LuEyeOff onClick={() => setShowPassword(false)} />
                        ) : (
                            <LuEye onClick={() => setShowPassword(true)} />
                        )}
                    </Flex>
                )}
            </Flex>
            {isError && <Text fontSize="14px" color={color.RED}>{helperText}</Text>}
        </Flex>
    );
};

export default TextInput;
