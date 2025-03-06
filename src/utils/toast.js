import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const showToast = (message, status = "success") => {
  toast({
    position: "bottom-right",
    title: message,
    status:status,
    isClosable: true,
  });
};
