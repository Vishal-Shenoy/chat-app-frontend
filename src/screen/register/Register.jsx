import { Flex, Text,useToast } from "@chakra-ui/react";
import React, { useState,useContext } from "react";
import { color } from "../../constants/color";
import { IoIosChatbubbles } from "react-icons/io";
import TextInput from "../../components/TextInput";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { ApiCall } from "../../constants/axios";
import { registerEndPoint } from "../../constants/endpoint";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../utils/decode-jwt";
import { checkUserPersist, persistUser } from "../../utils/user-persit";


const Register = () => {
  const {user,setUser} = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
  const schema = z
    .object({
      userName: z
        .string()
        .min(1, { message: "Name is required" })
        .min(4, { message: "Length must be at least 4" })
        .max(10, { message: "must be less than 10" })
        .toLowerCase(),
      email: z.string().email({ message: "Enter a valid email" }).toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password length must be 8" })
        .regex(passwordRegex, {
          message: "must contain A-Z ,a-z,0-9 and symbols",
        }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password length must be 8" })
        .regex(passwordRegex, {
          message: "must contain A-Z ,a-z,0-9 and symbols",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { control, handleSubmit, formState, trigger } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiCall("POST", registerEndPoint(), data),
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

  const handleRegister = (data) => {
    console.log("came")
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
        <form onSubmit={handleSubmit(handleRegister)}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextInput
                field={field}
                label="USERNAME"
                placeholder="Enter Your Username"
                marginTop="5vh"
                type="text"
                icon={<CiUser />}
                helperText={errors?.userName?.message}
                isError={!!errors?.userName}
                onBlur={() => trigger("userName")}
              />
            )}
          />
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                field={field}
                label="CONFIRM PASSWORD"
                placeholder="Enter Your Password"
                marginTop="5vh"
                type="password"
                icon={<TbLockPassword />}
                helperText={errors?.confirmPassword?.message}
                isError={!!errors?.confirmPassword}
                onBlur={() => trigger("confirmPassword")}
              />
            )}
          />

          <Flex marginTop="2vh" gap="1vw">
          <input type="checkbox" value={checkUserPersist()} onClick={() => persistUser()}/><Text>Remeber Me</Text>
          </Flex>

          <Button
            placeHolder="Register"
            onPress={handleSubmit(handleRegister)}
            loading={isPending}
            marginTop="3vh"
          />
          <Text marginTop="3vh">
            Already Have an Account ? <Link to="/">Login</Link>
          </Text>
        </form>

        <Text></Text>
      </Flex>
    </Flex>
  );
};

export default Register;
