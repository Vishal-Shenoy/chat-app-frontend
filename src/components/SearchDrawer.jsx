import React, { useContext, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Flex,
  background,
  Text,
  Image,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { ApiCall } from "../constants/axios";
import { searchEndPoint } from "../constants/endpoint";
import SearchCard from "./SearchCard";
import spinner from "../assets/loading.gif";
const SearchDrawer = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const { user } = useContext(AppContext);
  const { searchDrawer, setSearchDrawer } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = setTimeout(() => {
      search?.length > 0 && handleSearch();
      1;
    }, 2000);

    return () => clearTimeout(getData);
  }, [search]);

  const handleSearch = async () => {
    setLoading(true);
    const { data, status } = await ApiCall(
      "GET",
      searchEndPoint(user?._id, search)
    );
    if (status == 200) {
      setData(data?.users);
    }
    setLoading(false);
  };

  return (
    <Drawer
      isOpen={searchDrawer}
      placement="right"
      onClick={() => {
        setData(null);
        setSearchDrawer(false);
      }}
      size={"sm"}
    >
      <DrawerOverlay />
      <DrawerContent sx={{ background: "var(--dark-background)" }}>
        <DrawerCloseButton
          onClick={() => {
            setData(null);
            setSearchDrawer(false);
          }}
          sx={{ color: "var(--text)" }}
        />
        <DrawerHeader sx={{ color: "var(--text)" }}>Search</DrawerHeader>

        <DrawerBody>
          <Input
            placeholder="Search here..."
            border="solid 1px white"
            onChange={(e) => setSearch(e.target.value)}
            focusBorderColor="white"
            color="#ffffff"
            _placeholder={{
              color: "white",
            }}
          />
          {loading == false && data != null && data?.length == 0 && (
            <Text color="red" textAlign="center" marginTop="1vh">
              No User Found
            </Text>
          )}

          {loading && (
            <Flex
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={spinner} height="50px" width="50px" />
            </Flex>
          )}

          <Flex marginTop="3vh" />
          {data &&
            data?.map((item) => {
              return <SearchCard {...item} />;
            })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
