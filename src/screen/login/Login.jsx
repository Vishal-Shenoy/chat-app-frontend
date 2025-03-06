import { Flex, Text,useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { color } from "../../constants/color";
import { IoIosChatbubbles } from "react-icons/io";
import TextInput from "../../components/TextInput";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { ApiCall } from "../../constants/axios";
import { loginEndPoint } from "../../constants/endpoint";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../utils/decode-jwt";

const Login = () => {
  const navigate = useNavigate();
  const {user,setUser} = useContext(AppContext);
  const toast = useToast();
  const { control, handleSubmit, formState, trigger } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiCall("PUT", loginEndPoint(), data),
    onSuccess: (response) => {
      const {data,message,status} = response;
      const {_id , userName,email,profileUrl} = decodeToken(data?.accessToken);
      if(status === 200){
      setUser({
        _id : _id,
        userName : userName,
        email : email,
        profileUrl : profileUrl
      })
      navigate("/home");
    }
    },
    onError: (error) => {
      const {status,message} = error;
      toast({
        position:"bottom-right",
        title: message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const handleLogin = (data) => {
    delete data?.confirmPassword;
    mutate(data);
  };

  return (
    <Flex height="100vh" flexDirection={{ base: "column", md: "row" }}>
      <Flex
        height={{ base: "30%", md: "100%" }}
        width={{ base: "100%", md: "50%" }}
        background={color.BLUE}
        flexDirection="column"
        justifyContent={{ base: "center", md: "unset" }}
        alignItems={{ base: "center", md: "unset" }}
        paddingBottom="10vh"
        paddingTop="10vh"
        paddingInline="5vw"
      >
        <Flex
          fontSize="30vh"
          flexDirection="column"
          height="200%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <IoIosChatbubbles color={color.WHITE} />
          <Text fontSize="3vh" color={color.WHITE} fontWeight="bold">
            SOCIOGRAM
          </Text>
        </Flex>
        <Text
          marginTop="auto"
          textAlign="center"
          color={color.WHITE}
          display={{ base: "none", md: "unset" }}
        >
          Welcome to Sociogram – where conversations come to life! Connect
          instantly, share moments, and stay close to the people who matter
          most.
        </Text>
      </Flex>
      <Flex
        height="100%"
        width={{ base: "100%", md: "50%" }}
        flexDirection="column"
        alignItems={{ base: "center" }}
        justifyContent={{ base: "center" }}
        paddingInline="5vw"
      >
        <form>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                field={field}
                label="EMAIL"
                placeholder="Enter Your Email"
                marginTop="5vh"
                type="text"
                icon={<CiMail />}
                helperText={errors?.email?.message}
                isError={!!errors?.email}
                onBlur={() => trigger("email")}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                field={field}
                label="PASSWORD"
                placeholder="Enter Your Password"
                marginTop="5vh"
                type="password"
                icon={<TbLockPassword />}
                helperText={errors?.password?.message}
                isError={!!errors?.password}
                onBlur={() => trigger("password")}
              />
            )}
          />
          <Button
            placeHolder="Login"
            onPress={handleSubmit(handleLogin)}
            loading={isPending}
            marginTop="3vh"
          />


          <Text marginTop="3vh">New Here ? <Link to="/register">Register</Link></Text>
        </form>

        <Text></Text>
      </Flex>
    </Flex>
  );
};

export default Login;
