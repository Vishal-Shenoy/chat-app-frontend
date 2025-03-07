import React, { useContext, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { NotificationContext } from "../context/NotificationContext";
import RequestCard from "./RequestCard";
const NotificationDrawer = () => {
  const { notificationDrawer, setNotificationDrawer } = useContext(AppContext);
  const { notification } = useContext(NotificationContext);
  return (
    <Drawer
      isOpen={notificationDrawer}
      placement="right"
      onClose={() => setNotificationDrawer(false)}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={() => setNotificationDrawer(false)} />
        <DrawerHeader>Notification</DrawerHeader>

        <DrawerBody>
          {notification &&
            notification?.map((item) => {
              return <RequestCard {...item} time={item?.updatedAt} />;
            })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationDrawer;
