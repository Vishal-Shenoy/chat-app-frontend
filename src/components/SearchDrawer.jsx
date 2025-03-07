import React, { useContext, useState ,useEffect} from "react";
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
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { ApiCall } from "../constants/axios";
import { searchEndPoint } from "../constants/endpoint";
import SearchCard from "./SearchCard";
const SearchDrawer = () => {
  const [search, setSearch] = useState("");
  const [data,setData] = useState();
  const {user} = useContext(AppContext);
  const { searchDrawer, setSearchDrawer } = useContext(AppContext);
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    const getData = setTimeout(() => {
      handleSearch();
    }, 2000)

    return () => clearTimeout(getData)
  }, [search])

  const handleSearch = async() => {
    setLoading(true);  
    const {data,status} = await ApiCall("GET",searchEndPoint(user?._id,search));
    console.log(data)
    if(status == 200){
      setData(data?.users);
    }
    setLoading(false);
  }

  return (
    <Drawer
      isOpen={searchDrawer}
      placement="right"
      onClose={() => setSearchDrawer(false)}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={() => setSearchDrawer(false)} />
        <DrawerHeader>Search</DrawerHeader>

        <DrawerBody>
          <Input
            placeholder="Search here..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Flex marginTop="1vh"/>
          {
            data && data?.map((item) => {
              console.log("hello")
              return(
                <SearchCard {...item}/>
              )
            })
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
